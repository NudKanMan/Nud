import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ActivityService } from './activity.service';
import { ApiTags } from '@nestjs/swagger';
import {
  CreateActivityDto,
  UpdateActivityDto,
  JoinActivityDto,
  LeaveActivityDto,
} from './activity.dto';
import { RmqService } from 'src/rabbitmq/rmq.service';
import { JwtUserGuard } from 'src/guard/auth.guard';

@ApiTags('Activities')
@Controller('activities')
export class ActivityController {
  constructor(
    private readonly activityService: ActivityService,
    private readonly rmqService: RmqService,
  ) {}

  @Post()
  @UseGuards(JwtUserGuard)
  createActivity(@Body() data: CreateActivityDto, @Req() req) {
    if (!req.userId) throw new Error('User not found');
    data.ownerId = req.userId;
    this.rmqService.sendMessage(data, 'activity_exchange', 'create.activity');
    return true;
  }

  @Get()
  listActivities() {
    return this.activityService.listActivities();
  }

  @Get('/:id')
  @UseGuards(JwtUserGuard)
  getActivity(@Param('id') id: string, @Req() req) {
    if (!req.userId) throw new Error('User not found');
    return this.activityService.getActivity({ id, userId: req.userId });
  }

  @Put('/join')
  @UseGuards(JwtUserGuard)
  joinActivity(@Body() data: JoinActivityDto, @Req() req) {
    if (!req.userId) throw new Error('User not found');
    data.userId = req.userId;
    return this.activityService.joinActivity(data);
  }

  @Put('/leave')
  @UseGuards(JwtUserGuard)
  leaveActivity(@Body() data: LeaveActivityDto, @Req() req) {
    if (!req.userId) throw new Error('User not found');
    data.userId = req.userId;
    return this.activityService.leaveActivity(data);
  }

  @Put('/:id')
  @UseGuards(JwtUserGuard)
  updateActivity(
    @Body() data: UpdateActivityDto,
    @Param('id') id: string,
    @Req() req,
  ) {
    if (!req.userId) throw new Error('User not found');
    data.ownerId = req.userId;
    return this.activityService.updateActivity({ id, ...data });
  }

  @Delete('/:id')
  @UseGuards(JwtUserGuard)
  deleteActivity(@Req() req, @Param('id') id: string) {
    if (!req.userId) throw new Error('User not found');
    return this.activityService.deleteActivity({ id, ownerId: req.userId });
  }
}
