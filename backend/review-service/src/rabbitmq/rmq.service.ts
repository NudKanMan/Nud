import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as amqp from 'amqplib';
import { Model } from 'mongoose';
import { exchanges, queues } from 'src/constant/rmq';
import { User } from 'src/schemas/user';
@Injectable()
export class RmqService implements OnModuleInit, OnModuleDestroy {
  private connection: amqp.Connection;
  private channel: amqp.Channel;

  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
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
    this.connection = await amqp.connect('amqp://localhost');
    this.channel = await this.connection.createChannel();
    await Promise.all(
      exchanges.map((exchange) => this.assertExchange(exchange)),
    );

    await Promise.all(queues.map((queue) => this.assertQueue(queue)));
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

    await this.channel.consume('review_user_info_queue', async (msg) => {
      if (msg !== null) {
        const messageContent = msg.content.toString();
        const userInfo = JSON.parse(messageContent);
        console.log(`Message received: ${userInfo}`);

        try {
          const review = new this.userModel({
            userId: userInfo.id,
            name: userInfo.name,
            email: userInfo.email,
          });
          await review.save();
          console.log('User info saved:', review);
        } catch (error) {
          console.error('Error while saving user info:', error);
        }
        this.channel.ack(msg); // Acknowledge message after processing
      }
    });
  }
}
