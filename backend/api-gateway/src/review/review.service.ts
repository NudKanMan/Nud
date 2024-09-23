import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { GRPC_PACKAGE } from 'src/constant/grpc';

interface ReviewGrpcService {
  GetHello(data: any): Observable<any>;
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

  getHello() {
    return this.reviewService.GetHello({});
  }
}
