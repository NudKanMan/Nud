import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Review } from './schemas/review';
import { Model } from 'mongoose';
import {
  CreateReviewRequestDto,
  EditReviewById,
  FindByActivityIdRequestDto,
} from './review.dto';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable, lastValueFrom } from 'rxjs';
import { User } from './schemas/user';

interface ActivityGrpcService {
  CreateActivity(data: any): Observable<any>;
  UpdateActivity(data: any): Observable<any>;
  DeleteActivity(data: any): Observable<any>;
  GetActivity(data: any): Observable<any>;
  ListActivities(data: any): Observable<any>;
  JoinActivity(data: any): Observable<any>;
  LeaveActivity(data: any): Observable<any>;
}

@Injectable()
export class AppService {
  private activityService: ActivityGrpcService;

  constructor(
    @InjectModel(Review.name) private readonly reviewModel: Model<Review>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @Inject('ACTIVITY_PACKAGE')
    private readonly activityGrpcService: ClientGrpc,
  ) {}

  onModuleInit() {
    this.activityService =
      this.activityGrpcService.getService<ActivityGrpcService>(
        'ActivityService',
      );
  }

  async createReview(obj: CreateReviewRequestDto) {
    console.log(obj);
    const activity = await lastValueFrom(
      this.activityService.GetActivity({
        id: obj.activityId,
        userId: obj.userId,
      }),
    );
    if (!activity) {
      throw new Error('Activity not found');
    }
    const createdReview = new this.reviewModel(obj);
    const res = await createdReview.save();
    console.log('res', res, createdReview);
    // Get user by id
    const user = await this.userModel.findOne({ userId: obj.userId });
    console.log('user', user);
    return {
      ...res.toJSON(),
      name: user.name,
      email: user.email,
    };
  }

  async findByActivityId({ activityId }: FindByActivityIdRequestDto) {
    const reviews = await this.reviewModel.find({ activityId: activityId });
    console.log(
      'reviews',
      reviews.map((r) => r.toJSON()),
    );

    const data = await Promise.all(
      reviews.map(async (r) => {
        const user = await this.userModel.findOne({ userId: r.userId });
        return {
          ...r.toJSON(),
          name: user.name,
          email: user.email,
        };
      }),
    );
    return { reviews: data };
  }

  async findReviewById(reviewId: string): Promise<Review> {
    const review = await this.reviewModel.findOne({ _id: reviewId });
    if (!review) {
      throw new HttpException(
        `Review with id ${reviewId} is not found`,
        HttpStatus.BAD_REQUEST,
      );
    }

    return review;
  }

  async editReviewById({ reviewId, editReviewObject }: EditReviewById) {
    try {
      const review = await this.findReviewById(reviewId);
      if (editReviewObject.comment) {
        review.comment = editReviewObject.comment;
      }
      if (editReviewObject.rating) {
        review.rating = Number(editReviewObject.rating);
      }
      review.updatedAt = new Date();
      const res = await review.save();
      const data = {
        id: res._id,
        activityId: res.activityId,
        userId: res.userId,
        rating: res.rating,
        comment: res.comment,
        createdAt: res.createdAt,
        updatedAt: res.updatedAt,
      } as Review;

      return { review: data };
    } catch (error) {
      throw new Error(error.toString());
    }
  }
}
