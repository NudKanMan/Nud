import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';

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
  getActivity(data: any): Observable<any> {
    return this.activityService.GetActivity(data);
  }

  listActivities(): Observable<any> {
    return this.activityService.ListActivities({});
  }

  createActivity(data: any): Observable<any> {
    console.log('data2', data);
    return this.activityService.CreateActivity(data);
  }

  updateActivity(data: any): Observable<any> {
    return this.activityService.UpdateActivity(data);
  }

  deleteActivity(data: any): Observable<any> {
    return this.activityService.DeleteActivity(data);
  }

  joinActivity(data: any): Observable<any> {
    return this.activityService.JoinActivity(data);
  }

  leaveActivity(data: any): Observable<any> {
    return this.activityService.LeaveActivity(data);
  }
}
