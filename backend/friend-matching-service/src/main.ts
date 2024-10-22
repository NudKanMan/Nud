import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const url = app.get(ConfigService).get('FRIEND_MATCHING_SERVICE_URL');

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: 'friendmatching',
      protoPath: join(__dirname, '../../proto/friendmatching.proto'),
      url,
    },
  });

  await app.startAllMicroservices();
  await app.init();
}
bootstrap();
