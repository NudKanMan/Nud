import { Module } from '@nestjs/common';
import { FriendMatchingController } from './friend-matching.controller';
import { FriendMatchingService } from './friend-matching.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { GRPC_PACKAGE } from 'src/constant/grpc';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: GRPC_PACKAGE.FRIEND_MATCHING_PACKAGE,
        useFactory: async (configService: ConfigService) => {
          const url = configService.get<string>('FRIEND_MATCHING_SERVICE_URL');
          return {
            transport: Transport.GRPC,
            options: {
              package: 'friendmatching',
              protoPath: join(__dirname, '../../../proto/friendmatching.proto'),
              url,
            },
          };
        },
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [FriendMatchingController],
  providers: [FriendMatchingService],
})
export class FriendMatchingModule {}
