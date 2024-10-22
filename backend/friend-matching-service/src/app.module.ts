import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { RmqModule } from './rabbitmq/rmq.module';
import { FriendRequest } from './entities/friend-request.entity';
import { User } from './entities/user.entity';
import { Friends } from './entities/friends.entity';

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
        entities: [FriendRequest, User, Friends],
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([FriendRequest, User, Friends]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '1d' },
      }),
      inject: [ConfigService],
    }),
    RmqModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
