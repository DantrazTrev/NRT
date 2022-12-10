import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
@WebSocketGateway(8000, {
  cors: { origin: '*' },
})
export class MessageGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() wss: Server;

  afterInit(server: Server) {
    console.log('Web Socket Server Init');
  }

  @SubscribeMessage('sendMessage')
  handleMessage(
    client: Socket,
    data: { message: string; alias: string },
  ): void {
    console.log(data);
    this.wss.emit('recMessage', data);
  }

  handleDisconnect(client: Socket) {
    console.log(`Disconnected: ${client.id}`);
    this.wss.emit('userdisconnected', `${client} disconnected`);
  }

  handleConnection(client: Socket) {
    console.log(`Connected ${client.id}`);
    this.wss.emit('userconnected', `${client} connected`);
  }
}
