import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Activity } from 'src/entities/activity.entity';
import { Repository } from 'typeorm';
import {
  CreateActivityRequestDto,
  DeleteActivityRequestDto,
  JoinActivityRequestDto,
  UpdateActivityRequestDto,
} from './activity.dto';
import { ActivityParticipant } from './entities/activity-participant.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Activity)
    private activitiesRepository: Repository<Activity>,
    @InjectRepository(ActivityParticipant)
    private activityParticipantsRepository: Repository<ActivityParticipant>,
  ) {}

  async findActivity(id: string): Promise<Activity> {
    const activity = await this.activitiesRepository.findOne({ where: { id } });
    if (!activity) {
      throw new NotFoundException(`Activity with ID ${id} not found`);
    }
    console.log('activity', activity);
    return activity;
  }

  async findAllActivities() {
    const activities = await this.activitiesRepository.find();
    console.log('activities', activities);
    return {
      activities: activities,
    };
  }

  async joinActivity(data: JoinActivityRequestDto): Promise<Activity> {
    const activity = await this.findActivity(data.id);
    if (!activity || activity.status === 'CLOSED') {
      throw new NotFoundException('Activity is already closed or not found');
    }
    activity.currentParticipants += 1;
    const participant = await this.activityParticipantsRepository.save({
      activityId: data.id,
      userId: data.userId,
    });
    const res = await this.activitiesRepository.save(activity);
    return res;
  }

  async leaveActivity(data: JoinActivityRequestDto): Promise<Activity> {
    const activity = await this.findActivity(data.id);
    if (!activity || activity.status === 'CLOSED') {
      throw new NotFoundException('Activity is already closed or not found');
    }
    activity.currentParticipants -= 1;
    await this.activityParticipantsRepository.delete({
      userId: data.userId,
      activityId: data.id,
    });
    const res = await this.activitiesRepository.save(activity);
    return res;
  }

  async createActivity(
    createActivityDto: CreateActivityRequestDto,
  ): Promise<Activity> {
    console.log('createActivityDto', createActivityDto);
    const activity = this.activitiesRepository.create({
      ...createActivityDto,
      startDate: new Date(createActivityDto.startDate),
      endDate: new Date(createActivityDto.endDate),
    });
    const res = await this.activitiesRepository.save(activity);
    return res;
  }

  async updateActivity(
    updateActivityDto: UpdateActivityRequestDto,
  ): Promise<Activity> {
    const activity = await this.findActivity(updateActivityDto.id);
    if (activity.ownerId !== updateActivityDto.ownerId) {
      throw new UnauthorizedException(
        'You are not authorized to update this activity',
      );
    }
    if (updateActivityDto.title) activity.title = updateActivityDto.title;
    if (updateActivityDto.description)
      activity.description = updateActivityDto.description;
    if (updateActivityDto.startDate)
      activity.startDate = new Date(updateActivityDto.startDate);
    if (updateActivityDto.endDate)
      activity.endDate = new Date(updateActivityDto.endDate);
    return this.activitiesRepository.save(activity);
  }

  async deleteActivity(data: DeleteActivityRequestDto): Promise<boolean> {
    const { id, ownerId } = data;
    const activity = await this.findActivity(id);
    if (
      !activity ||
      activity.status === 'CLOSED' ||
      activity.ownerId !== ownerId
    ) {
      throw new UnauthorizedException(
        'You are not authorized to delete this activity or the activity is already closed',
      );
    }
    const result = await this.activitiesRepository.delete({ id });
    return true;
  }
}
