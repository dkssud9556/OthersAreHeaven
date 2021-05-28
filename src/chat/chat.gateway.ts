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

@WebSocketGateway({
  transports: ['websocket'],
  origins: '*:*',
})
export class ChatGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {
  constructor(private readonly userService: UserService) {}

  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log(client.connected);
    console.log('connected', client.id, client.adapter.rooms);
  }

  @UseGuards(AuthGuard)
  @SubscribeMessage('AUTHENTICATION')
  async handleAuthentication(@ConnectedSocket() client: Socket) {
    await this.userService.updateSocketId(client.request.email, client.id);
  }

  afterInit(server) {}

  async handleDisconnect(client: Socket) {
    await this.userService.updateEmptySocketId(client.request.email);
    console.log('disconnected', client.id, client.adapter.rooms);
  }

  @SubscribeMessage('MATCH')
  handleMessage(client: Socket) {
    console.log('Match!!');
  }

  @SubscribeMessage('error')
  handleError(client: Socket) {}
}
