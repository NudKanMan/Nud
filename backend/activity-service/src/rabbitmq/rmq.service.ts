import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import * as amqp from 'amqplib';
import { exchanges, queues } from 'src/constants/rmq';
import { ActivityParticipant } from 'src/entities/activity-participant.entity';
import { Activity } from 'src/entities/activity.entity';
import { Repository } from 'typeorm';
@Injectable()
export class RmqService implements OnModuleInit, OnModuleDestroy {
  private connection: amqp.Connection;
  private channel: amqp.Channel;

  constructor(
    @InjectRepository(Activity)
    private activitiesRepository: Repository<Activity>,
    @InjectRepository(ActivityParticipant)
    private activitiesParticipantRepository: Repository<ActivityParticipant>,
    private readonly configService: ConfigService,
  ) {}

  async onModuleInit() {
    await this.connect();
    await this.consumeMessages();
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
    const url = this.configService.get('RMQ_URL');
    this.connection = await amqp.connect(url);
    this.channel = await this.connection.createChannel();
    await Promise.all(
      exchanges.map((exchange) => this.assertExchange(exchange)),
    );

    await Promise.all(queues.map((queue) => this.assertQueue(queue)));
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
        //console.log(`Message received: ${createActivityDto}`);

        try {
          const activity = await this.activitiesRepository.save({
            ...createActivityDto,
            currentParticipants: 1,
            startDate: new Date(createActivityDto.startDate),
            endDate: new Date(createActivityDto.endDate),
          });
          await this.activitiesParticipantRepository.save({
            activityId: activity.id,
            userId: createActivityDto.ownerId,
          });
        } catch (error) {
          console.error('Error while saving activity:', error);
        }
        this.channel.ack(msg); // Acknowledge message after processing
      }
    });
  }
}
