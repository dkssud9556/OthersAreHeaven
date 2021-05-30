import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
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

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

@WebSocketGateway({
  transports: ['websocket'],
  origins: '*:*',
})
export class ChatGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {
  constructor(
    private readonly userService: UserService,
    private readonly roomService: RoomService,
    private readonly chatService: ChatService,
  ) {}

  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {}

  @UseGuards(AuthGuard)
  @SubscribeMessage('AUTHENTICATION')
  async handleAuthentication(@ConnectedSocket() client: Socket) {
    await this.userService.updateSocketId(client.request.email, client.id);
    client.emit('AUTHENTICATED', { email: client.request.email });
  }

  async handleDisconnect(client: Socket) {
    const user = await this.userService.findOne(client.request.email);
    if (user.roomId) {
      this.server.to(user.roomId).emit('RECEIVE_MESSAGE', {
        content: '상대방이 떠났습니다.',
        senderEmail: 'system',
        roomId: user.roomId,
      });
      await this.userService.updateEmptyRoomId(client.request.email);
    }
    await this.userService.updateEmptySocketId(client.request.email);
  }

  async afterInit(server: Server) {
    while (true) {
      const users = await this.userService.findMatchingUsers();
      if (users.length > 1) {
        const first = Math.floor(Math.random() * users.length);
        let second = Math.floor(Math.random() * users.length);
        while (first === second)
          second = Math.floor(Math.random() * users.length);
        const room = await this.roomService.save();
        await this.userService.updateRoomId(
          [users[first].email, users[second].email],
          room.id,
        );
        server.sockets.sockets[users[first].socketId].join(room.id);
        server.sockets.sockets[users[second].socketId].join(room.id);
        server.sockets.to(room.id).emit('MATCHED');
      }
      await delay(3000);
    }
  }

  @UseGuards(AuthGuard)
  @SubscribeMessage('MATCH')
  handleMatch(client: Socket) {
    console.log('match');
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
      this.server.to(user.roomId).emit('RECEIVE_MESSAGE', {
        content: '상대방이 떠났습니다.',
        senderEmail: 'system',
        roomId: user.roomId,
      });
      await this.userService.updateEmptyRoomId(client.request.email);
    }
  }

  @SubscribeMessage('error')
  handleError(client: Socket) {}
}
