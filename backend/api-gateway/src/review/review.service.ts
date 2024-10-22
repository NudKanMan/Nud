import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { GRPC_PACKAGE } from 'src/constant/grpc';
import { CreateReviewRequestDto, EditReviewRequest } from './review.dto';

interface ReviewGrpcService {
  CreateReview(data: any): Observable<any>;
  FindByActivityId(data: any): Observable<any>;
  EditReviewById(data: any): Observable<any>;
}

@Injectable()
export class ReviewService {
  private reviewService: ReviewGrpcService;
  constructor(
    @Inject(GRPC_PACKAGE.REVIEW_PACKAGE)
    private readonly reviewGrpcService: ClientGrpc,
  ) {}

  onModuleInit() {
    this.reviewService =
      this.reviewGrpcService.getService<ReviewGrpcService>('ReviewService');
  }

  createReview(obj: CreateReviewRequestDto) {
    return this.reviewService.CreateReview(obj);
  }

  findByActivityId(id: string) {
    return this.reviewService.FindByActivityId({ activityId: id });
  }

  editReviewById(obj: EditReviewRequest) {
    return this.reviewService.EditReviewById(obj);
  }
}
