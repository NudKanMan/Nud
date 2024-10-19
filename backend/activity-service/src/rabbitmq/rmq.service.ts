import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as amqp from 'amqplib';
import { exchanges, queues } from 'src/constants/rmq';
import { Activity } from 'src/entities/activity.entity';
import { Repository } from 'typeorm';
@Injectable()
export class RmqService implements OnModuleInit, OnModuleDestroy {
  private connection: amqp.Connection;
  private channel: amqp.Channel;

  constructor(
    @InjectRepository(Activity)
    private activitiesRepository: Repository<Activity>,
  ) {}

  async onModuleInit() {
    console.log('fsafsdfgsadgdsgfsgsgs');
    await this.connect();
  }

  async onModuleDestroy() {
    try {
      await this.channel.close();
      await this.connection.close();
      console.log('RabbitMQ connection closed.');
    } catch (error) {
      console.error('Error during RabbitMQ shutdown:', error);
    }
  }

  async connect() {
    this.connection = await amqp.connect('amqp://localhost');
    this.channel = await this.connection.createChannel();
    for (const exchange of exchanges) {
      await this.assertExchange(exchange);
    }
    for (const queue of queues) {
      await this.assertQueue(queue);
    }
  }

  async sendMessage(obj: any, exchangeName: string, routingKey: string) {
    const messageBuffer = Buffer.from(JSON.stringify(obj));
    await this.channel.publish(exchangeName, routingKey, messageBuffer, {
      persistent: true,
    });
    console.log(`Message sent: ${obj}`);
  }
  private async assertQueue(queue: any) {
    await this.channel.assertQueue(queue.name, {
      durable: queue.durable,
    });
    await this.channel.bindQueue(
      queue.name,
      queue.bindToExchange,
      queue.bindingKey,
    );
  }

  private async assertExchange(exchange: any) {
    await this.channel.assertExchange(exchange.name, exchange.type, {
      durable: exchange.durable,
    });
  }

  async consumeMessages() {
    if (!this.channel) {
      console.error('Channel is not initialized');
      return;
    }

    await this.channel.consume('activity_queue', async (msg) => {
      if (msg !== null) {
        const messageContent = msg.content.toString();
        const createActivityDto = JSON.parse(messageContent);
        console.log(`Message received: ${createActivityDto}`);
        const activity = this.activitiesRepository.create({
          ...createActivityDto,
          startDate: new Date(createActivityDto.startDate),
          endDate: new Date(createActivityDto.endDate),
        });
        await this.activitiesRepository.save(activity);
        this.channel.ack(msg); // Acknowledge message after processing
      }
    });
  }
}
