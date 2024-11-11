import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // gRPC Microservice Configuration
  const grpcUrl = configService.get('ACTIVITY_SERVICE_URL');
  const protoPath = configService.get('ACTIVITY_PROTO_PATH');
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: 'activities',
      protoPath: join(__dirname, protoPath),
      url: grpcUrl,
    },
  });

  // Enable CORS for frontend access
  app.enableCors({
    origin: 'http://localhost:3000', 
    methods: 'GET,POST,PUT,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization',
  });

  // Start the gRPC and HTTP services
  await app.startAllMicroservices();
  await app.listen(5003);
}
bootstrap();