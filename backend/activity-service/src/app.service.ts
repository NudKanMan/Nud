import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
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
    return activity;
  }

  async findAllActivities(): Promise<Activity[]> {
    return this.activitiesRepository.find();
  }

  async createActivity(
    createActivityDto: CreateActivityRequestDto,
  ): Promise<Activity> {
    const activity = this.activitiesRepository.create({
      ...createActivityDto,
      start_date: new Date(createActivityDto.start_date),
      end_date: new Date(createActivityDto.end_date),
    });
    activity.ownerId = createActivityDto.owner_id;
    return this.activitiesRepository.save(activity);
  }

  async updateActivity(
    updateActivityDto: UpdateActivityRequestDto,
  ): Promise<Activity> {
    const activity = await this.findActivity(updateActivityDto.id);
    if (activity.ownerId !== updateActivityDto.user_id) {
      throw new UnauthorizedException(
        'You are not authorized to update this activity',
      );
    }
    activity.title = updateActivityDto.title;
    activity.description = updateActivityDto.description;
    activity.start_date = new Date(updateActivityDto.start_date);
    activity.end_date = new Date(updateActivityDto.end_date);
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
