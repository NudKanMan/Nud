import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Review, ReviewSchema } from './schemas/review';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule], // Import ConfigModule for async configuration
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URL'),
        user: configService.get<string>('MONGO_INITDB_ROOT_USERNAME'),
        pass: configService.get<string>('MONGO_INITDB_ROOT_PASSWORD'),
        dbName: configService.get<string>('MONGO_INITDB_DATABASE'),
      }),
      inject: [ConfigService], // Inject ConfigService
    }),
    MongooseModule.forFeature([{ name: Review.name, schema: ReviewSchema }]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
