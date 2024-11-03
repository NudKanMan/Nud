import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const url = app.get(ConfigService).get('FRIEND_MATCHING_SERVICE_URL');
  const protoPath = app.get(ConfigService).get('FRIEND_MATCHING_PROTO_PATH');
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: 'friendmatching',
      protoPath: join(__dirname, protoPath),
      url,
    },
  });

  await app.startAllMicroservices();
  await app.init();
}
bootstrap();
