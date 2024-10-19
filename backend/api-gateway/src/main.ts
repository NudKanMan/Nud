import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { RmqService } from './rabbitmq/rmq.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableCors();
  const config = new DocumentBuilder()
    .setTitle('Nud API Gateway')
    .setVersion('1.0')
    .setDescription('The Nud API Gateway')
    .addBearerAuth()
    .addSecurityRequirements('bearer')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(app.get(ConfigService).get('API_GATEWAY_PORT'));
  const rabbitMQService = app.get(RmqService);
  await rabbitMQService.connect();
  // await rabbitMQService.consumeMessages();
}
bootstrap();
