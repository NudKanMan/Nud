export const exchanges = [
  { name: 'activity_exchange', type: 'topic', durable: true },
];
export const queues = [
  {
    name: 'activity_queue',
    bindToExchange: 'activity_exchange',
    bindingKey: '*.activity',
    durable: true,
  },
];
