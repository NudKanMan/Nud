import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { AppService } from './app.service';
import {
  CreateActivityRequestDto,
  UpdateActivityRequestDto,
  DeleteActivityRequestDto,
  GetActivityRequestDto,
} from './activity.dto';

@Controller()
export class AppController {
  constructor(private readonly activityService: AppService) {}

  @GrpcMethod('ActivityService', 'CreateActivity')
  async createActivity(data: CreateActivityRequestDto) {
    console.log('createActivity', data);
    return this.activityService.createActivity(data);
  }

  @GrpcMethod('ActivityService', 'UpdateActivity')
  async updateActivity(data: UpdateActivityRequestDto) {
    return this.activityService.updateActivity(data);
  }

  @GrpcMethod('ActivityService', 'DeleteActivity')
  async deleteActivity(data: DeleteActivityRequestDto) {
    return this.activityService.deleteActivity(data.id);
  }

  @GrpcMethod('ActivityService', 'GetActivity')
  async getActivity(data: GetActivityRequestDto) {
    return this.activityService.findActivity(data.id);
  }

  @GrpcMethod('ActivityService', 'ListActivities')
  async listActivities() {
    return this.activityService.findAllActivities();
  }
}
