import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';
import { RmqService } from './rabbitmq/rmq.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const url = app.get(ConfigService).get('ACTIVITY_SERVICE_URL');

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: 'activities',
      protoPath: join(__dirname, '../../proto/activity.proto'),
      url,
    },
  });

  await app.startAllMicroservices();
  await app.init();
}
bootstrap();
