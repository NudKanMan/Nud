import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Activity } from 'src/entities/Activity';
import { Repository } from 'typeorm';
import {
  CreateActivityRequestDto,
  UpdateActivityRequestDto,
} from './activity.dto';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Activity)
    private activitiesRepository: Repository<Activity>,
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
      activities: activities.map((activity) => ({
        id: activity.id,
        title: activity.title,
        description: activity.description,
        startDate: activity.startDate,
        endDate: activity.endDate,
        ownerId: activity.ownerId,
      })),
    };
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
    activity.ownerId = createActivityDto.ownerId;
    return this.activitiesRepository.save(activity);
  }

  async updateActivity(
    updateActivityDto: UpdateActivityRequestDto,
  ): Promise<Activity> {
    const activity = await this.findActivity(updateActivityDto.id);
    // if (activity.ownerId !== updateActivityDto.user_id) {
    //   throw new UnauthorizedException(
    //     'You are not authorized to update this activity',
    //   );
    // }
    if (updateActivityDto.title) activity.title = updateActivityDto.title;
    if (updateActivityDto.description)
      activity.description = updateActivityDto.description;
    if (updateActivityDto.startDate)
      activity.startDate = new Date(updateActivityDto.startDate);
    if (updateActivityDto.endDate)
      activity.endDate = new Date(updateActivityDto.endDate);
    return this.activitiesRepository.save(activity);
  }

  async deleteActivity(id: string): Promise<void> {
    const result = await this.activitiesRepository.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException(`Activity with ID ${id} not found`);
    }
    return;
  }
}
