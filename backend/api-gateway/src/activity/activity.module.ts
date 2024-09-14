import { Module } from '@nestjs/common';
import { ActivityController } from './activity.controller';
import { ActivityService } from './activity.service';

@Module({
  imports: [],
  controllers: [ActivityController],
  providers: [ActivityService],
})
export class ActivityModule {}
