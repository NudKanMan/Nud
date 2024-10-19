export const exchanges = [];
export const queues = [
  {
    name: 'activity_queue',
    bindToExchange: 'activity_exchange',
    bindingKey: '*.activity',
    durable: true,
  },
];
