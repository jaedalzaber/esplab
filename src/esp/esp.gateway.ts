import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Logger } from '@nestjs/common';

@WebSocketGateway()
export class EspGateway {
  private readonly logger = new Logger(EspGateway.name);

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    this.logger.log('Message received:', payload);
    return 'Hello world!';
  }
}