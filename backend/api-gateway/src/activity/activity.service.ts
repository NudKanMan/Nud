import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';

interface ActivityGrpcService {
  findAll(data: any): Observable<any>;
}

@Injectable()
export class ActivityService {
  private activityService: ActivityGrpcService;

  constructor(
    @Inject('ACTIVITY_PACKAGE')
    private readonly activityGrpcService: ClientGrpc,
  ) {}

  onModuleInit() {
    this.activityService =
      this.activityGrpcService.getService<ActivityGrpcService>(
        'ActivityService',
      );
  }

  findAll(data: any): Observable<any> {
    return this.activityService.findAll(data);
  }
}
