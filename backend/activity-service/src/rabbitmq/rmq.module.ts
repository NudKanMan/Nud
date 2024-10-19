import { Module } from '@nestjs/common';
import { RmqService } from './rmq.service';
import { Activity } from 'src/entities/activity.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Activity])],
  providers: [RmqService],
  exports: [RmqService],
})
export class RmqModule {}
