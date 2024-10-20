import { Module } from '@nestjs/common';
import { RmqService } from './rmq.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/user';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [RmqService],
  exports: [RmqService],
})
export class RmqModule {}
