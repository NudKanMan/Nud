import { Module } from '@nestjs/common';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { GRPC_PACKAGE } from 'src/constant/grpc';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: GRPC_PACKAGE.REVIEW_PACKAGE,
        useFactory: async (configService: ConfigService) => {
          const url = configService.get<string>('REVIEW_SERVICE_URL');
          const protoPath = configService.get<string>('REVIEW_PROTO_PATH');
          return {
            transport: Transport.GRPC,
            options: {
              package: 'review',
              protoPath: join(__dirname, protoPath),
              url,
            },
          };
        },
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule {}
