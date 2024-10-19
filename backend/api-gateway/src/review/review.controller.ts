import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { JwtUserGuard } from 'src/guard/auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { CreateReviewRequestDto } from './review.dto';

@ApiTags('Reviews')
@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get('/activity/:id')
  findAll(@Req() req, @Param('id') id: string) {
    return this.reviewService.findByActivityId(id);
  }

  @Post('/create')
  @UseGuards(JwtUserGuard)
  create(@Body() obj: CreateReviewRequestDto, @Req() req) {
    if (!req.userId) throw new Error('User not found');
    obj.userId = req.userId;
    return this.reviewService.createReview(obj);
  }
}
