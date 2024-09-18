import { Module } from '@nestjs/common';
import { ActivityController } from './activity.controller';
import { ActivityService } from './activity.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { GRPC_PACKAGE } from 'src/constant/grpc';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: GRPC_PACKAGE.ACTIVITY_PACKAGE,
        useFactory: async (configService: ConfigService) => {
          const url = configService.get<string>('ACTIVITY_SERVICE_URL');
          return {
            transport: Transport.GRPC,
            options: {
              package: 'activities',
              protoPath: join(__dirname, '../../../proto/activity.proto'),
              url,
            },
          };
        },
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [ActivityController],
  providers: [ActivityService],
})
export class ActivityModule {}
