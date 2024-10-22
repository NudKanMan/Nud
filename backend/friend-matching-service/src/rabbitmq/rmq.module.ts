import { Module } from '@nestjs/common';
import { RmqService } from './rmq.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [RmqService],
  exports: [RmqService],
})
export class RmqModule {}
