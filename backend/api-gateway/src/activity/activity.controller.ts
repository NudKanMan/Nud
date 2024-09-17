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
  ActivityResponseDto,
  DeleteActivityDto,
  GetActivityDto,
  ListActivitiesDto,
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
