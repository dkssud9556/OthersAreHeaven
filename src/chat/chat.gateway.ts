import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  transports: ['websocket'],
  origins: '*:*',
})
export class ChatGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log(client.connected);
    console.log('connected', client.id, client.adapter.rooms);
  }

  afterInit(server) {
    console.log(server);
  }

  handleDisconnect(client: Socket) {
    console.log('disconnected', client.id, client.adapter.rooms);
  }

  @SubscribeMessage('MATCH')
  handleMessage(client: Socket) {
    console.log('Match!!');
  }

  @SubscribeMessage('error')
  handleError(client: Socket) {}
}
