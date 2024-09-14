import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ClientsModule } from '@nestjs/microservices';
import { grpcUserClientOptions } from 'src/grpc-client.options';
import { GRPC_PACKAGE } from 'src/constant/grpc';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: GRPC_PACKAGE.USER_PACKAGE,
        ...grpcUserClientOptions,
      },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
