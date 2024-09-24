import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { GrpcMethod } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @GrpcMethod('ReviewService', 'GetHello')
  getHello() {
    return { message: this.appService.getHello() };
  }

  @GrpcMethod('ReviewService', 'Create')
  async create(data: { title: string; description: string }) {
    try {
      await this.appService.create(data);
      return { message: 'created!' };
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  }

  @GrpcMethod('ReviewService', 'FindAll')
  async findAll() {
    const ans = await this.appService.findAll();
    return { message: 'founded!', reviews: ans };
  }
}
