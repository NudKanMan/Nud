import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Activity } from './entities/Activity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        url:
          'mysql://root:' +
          configService.get('MYSQL_ROOT_PASSWORD') +
          '@localhost:' +
          configService.get('DATABASE_PORT') +
          '/' +
          configService.get('MYSQL_DATABASE'),
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
