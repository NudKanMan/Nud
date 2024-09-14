import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const grpcActivityClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: 'mygrpcpackage', // replace with your package name
    protoPath: join(__dirname, '../../../proto/mygrpc.proto'), // path to proto file
    url: 'localhost:5001', // gRPC service address
  },
};

export const grpcUserClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: 'user',
    protoPath: join(__dirname, '../../proto/user.proto'),
    url: 'localhost:5002',
  },
};
