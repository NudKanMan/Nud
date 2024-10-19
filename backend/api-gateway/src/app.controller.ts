import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { RmqService } from './rabbitmq/rmq.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly rmqService: RmqService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  send(@Body() obj: any) {
    this.rmqService.sendMessage('fmdskvmsl');
  }
}
