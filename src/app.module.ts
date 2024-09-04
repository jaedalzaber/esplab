import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoveController } from './move/move.controller';
import { EspGateway } from './esp/esp.gateway';

@Module({
  imports: [],
  controllers: [AppController, MoveController],
  providers: [AppService, EspGateway],
})
export class AppModule {}
