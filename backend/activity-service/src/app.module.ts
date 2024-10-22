import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Activity } from './entities/activity.entity';
import { ActivityParticipant } from './entities/activity-participant.entity';
import { RmqModule } from './rabbitmq/rmq.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports: [
    RmqModule,
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
    ClientsModule.registerAsync([
      {
        name: 'FRIEND_MATCHING_PACKAGE',
        useFactory: async (configService: ConfigService) => {
          const url = configService.get<string>('FRIEND_MATCHING_SERVICE_URL');
          console.log('url', url);
          return {
            transport: Transport.GRPC,
            options: {
              package: 'friendmatching',
              protoPath: join(__dirname, '../../proto/friendmatching.proto'),
              url,
            },
          };
        },
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
