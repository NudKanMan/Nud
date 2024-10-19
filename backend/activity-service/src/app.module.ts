import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Activity } from './entities/activity.entity';
import { ActivityParticipant } from './entities/activity-participant.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        username: configService.get('MYSQL_ROOT_USERNAME'),
        password: configService.get('MYSQL_ROOT_PASSWORD'),
        port: configService.get('DATABASE_PORT'),
        database: configService.get('MYSQL_DATABASE'),
        synchronize: true,
        entities: [Activity, ActivityParticipant],
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Activity, ActivityParticipant]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
