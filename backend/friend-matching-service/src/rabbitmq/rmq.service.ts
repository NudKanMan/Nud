import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import * as amqp from 'amqplib';
import { exchanges, queues } from 'src/constant/rmq';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
@Injectable()
export class RmqService implements OnModuleInit, OnModuleDestroy {
  private connection: amqp.Connection;
  private channel: amqp.Channel;

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly configService: ConfigService,
  ) {}

  async onModuleInit() {
    await this.connect(); // Call connect when the module initializes
    await this.consumeMessages(); // Call consumeMessages when the module initializes
  }

  async onModuleDestroy() {
    await this.channel.close();
    await this.connection.close();
  }

  async connect() {
    const url = this.configService.get('RMQ_URL');
    console.log('Connecting to RMQ:', url);
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

    await this.channel.consume(
      'friend_matching_user_info_queue',
      async (msg) => {
        if (msg !== null) {
          const messageContent = msg.content.toString();
          const userInfo = JSON.parse(messageContent);
          console.log(`Message received: ${userInfo}`);

          try {
            await this.userRepository.save({
              id: userInfo.id,
              email: userInfo.email,
              name: userInfo.name,
              userId: userInfo.id,
            });
          } catch (error) {
            console.error('Error while saving user info:', error);
          }
          this.channel.ack(msg); // Acknowledge message after processing
        }
      },
    );
  }
}
