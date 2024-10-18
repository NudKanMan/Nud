import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'activity_queue', // Name of the queue to bind to
      queueOptions: {
        durable: false,
      },
    },
  });

  app.enableCors();
  const config = new DocumentBuilder()
    .setTitle('Nud API Gateway')
    .setVersion('1.0')
    .setDescription('The Nud API Gateway')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(app.get(ConfigService).get('API_GATEWAY_PORT'));
}
bootstrap();
