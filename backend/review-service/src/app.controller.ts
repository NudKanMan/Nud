import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { GrpcMethod } from '@nestjs/microservices';
import {
  CreateReviewRequestDto,
  EditReviewById,
  FindByActivityIdRequestDto,
} from './review.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @GrpcMethod('ReviewService', 'CreateReview')
  async createReview(data: CreateReviewRequestDto) {
    return this.appService.createReview(data);
  }

  @GrpcMethod('ReviewService', 'FindByActivityId')
  async findByActivityId(data: FindByActivityIdRequestDto) {
    return this.appService.findByActivityId(data);
  }

  @GrpcMethod('ReviewService', 'EditReviewById')
  async editReviewById(data: EditReviewById) {
    return this.appService.editReviewById(data);
  }
}
