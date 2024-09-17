import { Headers, Body, Controller, Post, Get, Delete, Param, Put } from "@nestjs/common";
import { ActivitiesService } from "../services/activities/acitivities.service";
import { CreateActivityDto } from "../dtos/CreateActivity.dtos";
import { UpdateActivityDto } from "../dtos/UpdateActivity.dtos";

@Controller('activities')
export class ActivitiesController {
    constructor(private readonly activitiesService: ActivitiesService) {}

    // Get all activities
    @Get()
    async findAllActivities() {
        return this.activitiesService.findAllActivities();
    }

    // Get a single activity by ID
    @Get(':id')
    async findActivity(@Param('id') id: number) {
        return this.activitiesService.findActivity(id);
    }

    // Create a new activity
    @Post()
    async create(
        @Body() createActivityDto: CreateActivityDto,
        @Headers('userId') userId: string,
    ) {
        return this.activitiesService.createActivity(createActivityDto, +userId);
    }

    // Update an existing activity
    @Put(':id')
    async updateActivity(
        @Param('id') id: number,
        @Body() updateActivityDto: UpdateActivityDto,
        @Headers('userId') userId: string,
    ) {
        return this.activitiesService.updateActivity(id, updateActivityDto, +userId);
    }

    // Delete an activity
    @Delete(':id')
    async deleteActivity(@Param('id') id: number) {
        return this.activitiesService.deleteActivity(id);
    }
}