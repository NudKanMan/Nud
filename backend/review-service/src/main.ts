import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const url = app.get(ConfigService).get('REVIEW_SERVICE_URL');
  const protoPath = app.get(ConfigService).get('REVIEW_PROTO_PATH');

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: 'review',
      url,
      protoPath: join(__dirname, protoPath),
    },
  });

  await app.startAllMicroservices();
  await app.init();
}
bootstrap();
