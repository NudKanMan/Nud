import { Headers, Body, Controller, Post } from "@nestjs/common";
import { CreateActivityDto } from "../dtos/CreateActivity.dtos";
import { ActivitiesService } from "../services/activities/acitivities.service";

@Controller('activities')
export class ActivitiesController {
    constructor(private readonly activitiesService: ActivitiesService) {}

    @Post()
    create(
        @Body() createActivityDto: CreateActivityDto,
        @Headers('user-id') userId: string,
        @Headers('user-role') userRole: string,
    ) {
        return this.activitiesService.create(createActivityDto, +userId, userRole);
    }

}