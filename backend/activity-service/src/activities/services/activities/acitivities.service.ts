import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm"
import { CreateActivityDto } from "src/activities/dtos/CreateActivity.dtos";
import { UpdateActivityDto } from "src/activities/dtos/UpdateActivity.dtos";
import { Activity } from "src/entities/Activity";
import { Repository } from "typeorm";

@Injectable()
export class ActivitiesService {
    constructor(
        @InjectRepository(Activity) private activitiesRepository: Repository<Activity>,
      ) {}

    async findActivity(id: number): Promise<Activity> {
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
        createActivityDto: CreateActivityDto,
        userId: number,
        ): Promise<Activity> {
        const activity = this.activitiesRepository.create({
            ...createActivityDto,
            start_date: new Date(createActivityDto.start_date),
            end_date: new Date(createActivityDto.end_date),
        });
        activity.ownerId = userId;
        return this.activitiesRepository.save(activity);
    }

    async updateActivity(
        id: number,
        updateActivityDto: UpdateActivityDto,
        userId: number,
      ): Promise<Activity> {
        const activity = await this.findActivity(id);
        if (activity.ownerId !== userId) {
          throw new UnauthorizedException('You are not authorized to update this activity');
        }
        Object.assign(activity, updateActivityDto);
        return this.activitiesRepository.save(activity);
    }
    
    async deleteActivity(id: number): Promise<void> {
        const result = await this.activitiesRepository.delete(id);
        if (result.affected === 0) {
          throw new NotFoundException(`Activity with ID ${id} not found`);
        }
    }
}