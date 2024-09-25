import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class EspGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger = new Logger(EspGateway.name);
  private clients: { [id: string]: Socket } = {};
  users: number = 0;

  handleConnection(client: Socket) {
    this.users++;
    this.clients[this.users] = client;  // Store client by its socket ID
    this.logger.log(`Client connected: ${this.users}`);
  }

  // Handle client disconnection
  handleDisconnect(client: Socket) {
    delete this.clients[client.id];  // Remove client on disconnect
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  // Client A sends direction data
  @SubscribeMessage('dir')
  handleDirection(client: Socket, payload: { id: number, path:[{x:number, y:number, rz:number}] }) {
    // const { direction, targetClientId } = payload;
    // this.logger.log(`Direction "${direction}" received from ${client.id} for ${targetClientId}`);

    // const targetClient = this.clients[targetClientId];

    if (payload.id == 2) {
      
      // Forward direction to the target client
      this.clients[1].emit('receiveDirection', { payload});
    } 
  }

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    this.logger.log('Message received:', payload);
    const { direction, targetClientId } = payload;
    this.logger.log(payload.direction);
    return `Direction "${direction}" received from ${client.id} for ${targetClientId}`;
  }
}