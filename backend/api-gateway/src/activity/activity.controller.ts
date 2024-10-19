import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ActivityService } from './activity.service';
import { ApiTags } from '@nestjs/swagger';
import {
  CreateActivityDto,
  UpdateActivityDto,
  DeleteActivityDto,
  JoinActivityDto,
  LeaveActivityDto,
} from './activity.dto';

@ApiTags('Activities')
@Controller('activities')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Post()
  createActivity(@Body() data: CreateActivityDto) {
    console.log('data', data);
    return this.activityService.createActivity(data);
  }

  @Get()
  listActivities() {
    return this.activityService.listActivities();
  }

  @Put('/join')
  joinActivity(@Body() data: JoinActivityDto) {
    return this.activityService.joinActivity(data);
  }

  @Put('/leave')
  leaveActivity(@Body() data: LeaveActivityDto) {
    return this.activityService.leaveActivity(data);
  }

  @Put('/:id')
  updateActivity(@Body() data: UpdateActivityDto, @Param('id') id: string) {
    return this.activityService.updateActivity({ id, ...data });
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
