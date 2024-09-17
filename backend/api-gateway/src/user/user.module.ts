import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { GRPC_PACKAGE } from 'src/constant/grpc';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: GRPC_PACKAGE.USER_PACKAGE,
        useFactory: async (configService: ConfigService) => {
          const url = configService.get<string>('USER_SERVICE_URL');
          return {
            transport: Transport.GRPC,
            options: {
              package: 'user',
              protoPath: join(__dirname, '../../../proto/user.proto'),
              url,
            },
          };
        },
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
