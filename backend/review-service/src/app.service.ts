import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Review } from './schemas/review';
import { Model } from 'mongoose';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Review.name) private readonly reviewModel: Model<Review>,
  ) {}
  getHello(): string {
    return 'Hello World! from review';
  }

  async create(obj: { title: string; description: string }): Promise<Review> {
    const createdReview = await new this.reviewModel(obj);
    return createdReview;
  }

  async findAll() {
    const res = await this.reviewModel.find().exec();
    return res;
  }
}
