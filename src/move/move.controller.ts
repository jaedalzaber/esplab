import { Controller, Get, Post, Req } from '@nestjs/common';
import { log } from 'console';

@Controller('move')
export class MoveController {
    direction:String = 'stop';

    @Post()
    postMove(@Req() request: Request){
        this.direction = request.body["direction"];
    }

    @Get()
    getMove(){
        return { direction: this.direction};
    }
}
