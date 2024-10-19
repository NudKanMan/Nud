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
    @Inject('ACTIVITY_PACKAGE')
    private readonly activityGrpcService: ClientGrpc,
  ) {}

  onModuleInit() {
    this.activityService =
      this.activityGrpcService.getService<ActivityGrpcService>(
        'ActivityService',
      );
  }

  async createReview(obj: CreateReviewRequestDto): Promise<Review> {
    const activity = await lastValueFrom(
      this.activityService.GetActivity({ id: obj.activityId }),
    );
    if (!activity) {
      throw new Error('Activity not found');
    }
    const createdReview = new this.reviewModel(obj);
    const res = await createdReview.save();
    console.log('res', res, createdReview);
    return res.toJSON();
  }

  async findByActivityId({
    activityId,
  }: FindByActivityIdRequestDto): Promise<{ reviews: Review[] }> {
    const reviews = await this.reviewModel.find({ activityId: activityId });
    console.log(
      'reviews',
      reviews.map((r) => r.toJSON()),
    );
    return { reviews: reviews.map((r) => r.toJSON()) };
  }
}
