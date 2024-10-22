import { Module } from '@nestjs/common';
import { RmqService } from './rmq.service';
import { Activity } from 'src/entities/activity.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityParticipant } from 'src/entities/activity-participant.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Activity, ActivityParticipant])],
  providers: [RmqService],
  exports: [RmqService],
})
export class RmqModule {}
