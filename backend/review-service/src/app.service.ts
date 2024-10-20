import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Review } from './schemas/review';
import { Model } from 'mongoose';
import {
  CreateReviewRequestDto,
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
    const activity = await lastValueFrom(
      this.activityService.GetActivity({ id: obj.activityId }),
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
}
