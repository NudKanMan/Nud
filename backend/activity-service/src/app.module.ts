import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Activity } from './entities/Activity';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'ACTIVITY_SERVICE',
        useFactory: async (configService: ConfigService) => {
          const url = configService.get<string>('RABBITMQ_URL');
          return {
            transport: Transport.RMQ,
            options: {
              urls: [url],
              queue: 'activity_queue', // Name of the queue to bind to
              queueOptions: {
                durable: false,
              },
            },
          };
        },
        inject: [ConfigService],
      },
    ]),
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
        entities: [Activity],
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Activity]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
