import { Body, Controller, Get, Post } from '@nestjs/common';
import { ReviewService } from './review.service';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get()
  getHello() {
    return this.reviewService.getHello();
  }

  @Get('/reviews')
  findAll() {
    return this.reviewService.FindAll();
  }

  @Post('/create')
  create(@Body() obj: { title: string; description: string }) {
    return this.reviewService.Create(obj);
  }
}
