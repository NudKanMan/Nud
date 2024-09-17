import { Body, Controller, Get } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Activities')
@Controller('activities')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Post()
  createActivity(@Body() data: ActivityDto) {
    return this.activityService.createActivity(data);
  }
  @Get()

  @Get(/:id)

}
