import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Activity } from "src/entities/Activity";
import { ActivitiesController } from "./controller/activities.controller";
import { ActivitiesService } from "./services/activities/acitivities.service";

@Module({
    imports: [TypeOrmModule.forFeature([Activity])],
    controllers: [ActivitiesController],
    providers: [ActivitiesService]
})

export class ActivityModule {}