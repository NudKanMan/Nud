import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import * as amqp from 'amqplib';
import { exchanges, queues } from 'src/constant/rmq';
@Injectable()
export class RmqService implements OnModuleInit, OnModuleDestroy {
  private connection: amqp.Connection;
  private channel: amqp.Channel;

  async onModuleInit() {
    console.log('rmq initated');
    await this.connect(); // Call connect when the module initializes
  }

  async onModuleDestroy() {
    await this.channel.close();
    await this.connection.close();
  }

  async connect() {
    this.connection = await amqp.connect('amqp://localhost');
    this.channel = await this.connection.createChannel();

    // await this.channel.assertExchange('my_exchange', 'topic', {
    //   durable: true,
    // });

    for (const exchange of exchanges) {
      // await this.channel.assertExchange(exchange.name, exchange.type, {
      //   durable: exchange.durable,
      // });
      await this.assertExchange(exchange);
    }
    for (const queue of queues) {
      // await this.channel.assertQueue(queue.name, {
      //   durable: queue.durable,
      // });
      // await this.channel.bindQueue(
      //   queue.name,
      //   queue.bindToExchange,
      //   queue.bindingKey,
      // );

      await this.assertQueue(queue);
    }
    //await this.channel.bindQueue('my_queue', 'my_exchange', '*.activity');
  }

  async sendMessage(message: string) {
    await this.channel.publish(
      'activity_exchange',
      'created.activity',
      Buffer.from(message),
      {
        persistent: true,
      },
    );
    console.log(`Message sent: ${message}`);
  }
  //temp -----
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
    for (const queue of queues) {
      await this.channel.consume(queue.name, (msg) => {
        if (msg !== null) {
          const messageContent = msg.content.toString();
          console.log(`Message received: ${messageContent}`);
          this.channel.ack(msg); // Acknowledge message after processing
        }
      });
    }
    // await this.channel.consume('my_queue', (msg) => {
    //   if (msg !== null) {
    //     const messageContent = msg.content.toString();
    //     console.log(`Message received: ${messageContent}`);
    //     this.channel.ack(msg); // Acknowledge message after processing
    //   }
    // });
    // await this.channel.consume('activity_queue', (msg) => {
    //   if (msg !== null) {
    //     const messageContent = msg.content.toString();
    //     console.log(`Message received: ${messageContent}`);
    //     this.channel.ack(msg); // Acknowledge message after processing
    //   }
    // });
  }
  //temp -----
}
