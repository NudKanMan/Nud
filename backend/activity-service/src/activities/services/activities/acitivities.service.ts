import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm"
import { CreateActivityDto } from "src/activities/dtos/CreateActivity.dtos";
import { Activity } from "src/entities/Activity";
import { Repository } from "typeorm";

@Injectable()
export class ActivitiesService {
    constructor(
        @InjectRepository(Activity)
        private activitiesRepository: Repository<Activity>,
      ) {}

    async create(
        createActivityDto: CreateActivityDto,
        userId: number,
        userRole: string,
    ): Promise<Activity> {
        if (userRole!='owner') {
            throw new UnauthorizedException('Only owners can create activities');
        }
        const activity = this.activitiesRepository.create(createActivityDto);
        activity.ownerId = userId;
        return this.activitiesRepository.save(activity);
    }
}