import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Review, ReviewSchema } from './schemas/review';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { RmqModule } from './rabbitmq/rmq.module';
import { User, UserSchema } from './schemas/user';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URL'),
        user: configService.get<string>('MONGO_INITDB_ROOT_USERNAME'),
        pass: configService.get<string>('MONGO_INITDB_ROOT_PASSWORD'),
        dbName: configService.get<string>('MONGO_INITDB_DATABASE'),
      }),
      inject: [ConfigService], // Inject ConfigService
    }),
    MongooseModule.forFeature([
      { name: Review.name, schema: ReviewSchema },
      { name: User.name, schema: UserSchema },
    ]),
    ClientsModule.registerAsync([
      {
        name: 'ACTIVITY_PACKAGE',
        useFactory: async (configService: ConfigService) => {
          const url = configService.get<string>('ACTIVITY_SERVICE_URL');
          console.log('url', url);
          return {
            transport: Transport.GRPC,
            options: {
              package: 'activities',
              protoPath: join(__dirname, '../../proto/activity.proto'),
              url,
            },
          };
        },
        inject: [ConfigService],
      },
    ]),
    RmqModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
