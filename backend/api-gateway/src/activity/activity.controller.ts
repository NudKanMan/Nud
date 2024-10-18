import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ActivityService } from './activity.service';
import { ApiTags } from '@nestjs/swagger';
import {
  CreateActivityDto,
  UpdateActivityDto,
  ActivityResponseDto,
  DeleteActivityDto,
  GetActivityDto,
  ListActivitiesDto,
} from './activity.dto';
import { ClientProxy } from '@nestjs/microservices';

@ApiTags('Activities')
@Controller('activities')
export class ActivityController {
  constructor(
    @Inject('ACTIVITY_SERVICE') private client: ClientProxy,
    private readonly activityService: ActivityService,
  ) {}

  @Post('/testRMQ1')
  emitMessage1(@Body() obj: any) {
    console.log('send', obj);
    return this.client.emit('test1', obj);
  }

  @Post()
  createActivity(@Body() data: CreateActivityDto) {
    console.log('data', data);
    return this.activityService.createActivity(data);
  }

  @Put()
  updateActivity(@Body() data: UpdateActivityDto) {
    return this.activityService.updateActivity(data);
  }

  @Get()
  listActivities() {
    return this.activityService.listActivities();
  }

  @Get('/:id')
  getActivity(@Param('id') id: string) {
    return this.activityService.getActivity({ id });
  }

  @Delete()
  deleteActivity(@Body() data: DeleteActivityDto) {
    return this.activityService.deleteActivity(data);
  }
}
