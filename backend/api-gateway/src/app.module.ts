import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { ActivityModule } from './activity/activity.module';
import { ReviewModule } from './review/review.module';
import { RmqModule } from './rabbitmq/rmq.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
    ActivityModule,
    ReviewModule,
    RmqModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
