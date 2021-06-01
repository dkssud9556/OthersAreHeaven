import {
  ConnectedSocket,
  MessageBody,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { UserService } from '../user/service/user.service';
import { RoomService } from '../user/service/room.service';
import { ChatService } from './service/chat.service';

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

@WebSocketGateway({
  transports: ['websocket'],
  origins: '*:*',
})
export class ChatGateway implements OnGatewayDisconnect, OnGatewayInit {
  constructor(
    private readonly userService: UserService,
    private readonly roomService: RoomService,
    private readonly chatService: ChatService,
  ) {}

  @WebSocketServer()
  server: Server;

  @UseGuards(AuthGuard)
  @SubscribeMessage('AUTHENTICATION')
  async handleAuthentication(@ConnectedSocket() client: Socket) {
    await this.userService.updateSocketId(client.request.email, client.id);
    client.emit('AUTHENTICATED', { email: client.request.email });
  }

  async handleDisconnect(client: Socket) {
    if (client.request.email) {
      const user = await this.userService.findOne(client.request.email);
      if (user.roomId) {
        this.notifyLeaveOpposite(user.roomId);
        await this.userService.updateEmptyRoomId(client.request.email);
      }
      await this.userService.updateEmptySocketId(client.request.email);
    }
  }

  async afterInit(server: Server) {
    await this.userService.initSocketIdAndRoomId();
    while (true) {
      await this.randomMatch();
      await delay(3000);
    }
  }

  @UseGuards(AuthGuard)
  @SubscribeMessage('NEW_MESSAGE')
  async handleNewMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() body: any,
  ) {
    const user = await this.userService.findOne(client.request.email);
    const chat = await this.chatService.save({
      content: body.content,
      senderEmail: user.email,
      roomId: user.roomId,
    });
    this.server.to(user.roomId).emit('RECEIVE_MESSAGE', chat);
  }

  @UseGuards(AuthGuard)
  @SubscribeMessage('FIND_NEW_USER')
  async handleFindNewUser(
    @ConnectedSocket() client: Socket,
    @MessageBody() body: any,
  ) {
    const user = await this.userService.findOne(client.request.email);
    if (user.roomId) {
      client.leave(user.roomId, async (err) => {
        await this.userService.updateEmptyRoomId(client.request.email);
        const opposite = await this.userService.findOneByRoomId(user.roomId);
        if (opposite) {
          this.server.sockets.sockets[opposite.socketId].emit(
            'RECEIVE_MESSAGE',
            {
              content: '상대방이 떠났습니다.',
              senderEmail: 'system',
              roomId: user.roomId,
            },
          );
          this.server.sockets.sockets[opposite.socketId].emit('OPPOSITE_LEAVE');
          this.server.sockets.sockets[opposite.socketId].leave(user.roomId);
        }
      });
    }
  }

  private notifyLeaveOpposite(roomId: string): void {
    this.server.to(roomId).emit('RECEIVE_MESSAGE', {
      content: '상대방이 떠났습니다.',
      senderEmail: 'system',
      roomId,
    });
    this.server.to(roomId).emit('OPPOSITE_LEAVE');
  }

  private static chooseTwoRandomNumbers(
    numberOfUser: number,
  ): [number, number] {
    const first = ChatGateway.generateRandomNumber(numberOfUser);
    do {
      const second = ChatGateway.generateRandomNumber(numberOfUser);
      if (first !== second) return [first, second];
    } while (true);
  }

  private static generateRandomNumber(numberOfUser: number): number {
    return Math.floor(Math.random() * numberOfUser);
  }

  private async randomMatch() {
    const users = await this.userService.findMatchingUsers();
    if (users.length > 1) {
      const [first, second] = ChatGateway.chooseTwoRandomNumbers(users.length);
      const room = await this.roomService.save();
      await this.userService.updateRoomId(
        [users[first].email, users[second].email],
        room.id,
      );
      this.server.sockets.sockets[users[first].socketId].join(room.id);
      this.server.sockets.sockets[users[second].socketId].join(room.id);
      this.server.sockets.to(room.id).emit('MATCHED');
    }
  }
}
