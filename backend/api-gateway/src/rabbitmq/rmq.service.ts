import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import * as amqp from 'amqplib';
import { exchanges, queues } from 'src/constant/rmq';
@Injectable()
export class RmqService implements OnModuleInit, OnModuleDestroy {
  private connection: amqp.Connection;
  private channel: amqp.Channel;

  async onModuleInit() {
    await this.connect(); // Call connect when the module initializes
  }

  async onModuleDestroy() {
    await this.channel.close();
    await this.connection.close();
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

  async consumeMessages() {}
}
