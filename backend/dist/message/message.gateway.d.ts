import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
export declare class MessageGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    wss: Server;
    afterInit(server: Server): void;
    handleMessage(client: Socket, data: {
        message: string;
        alias: string;
    }): void;
    handleDisconnect(client: Socket): void;
    handleConnection(client: Socket): void;
}
