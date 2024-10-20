export const exchanges = [
  { name: 'user_exchange', type: 'fanout', durable: true },
];
export const queues = [
  {
    name: 'friend_matching_user_info_queue',
    durable: true,
    bindToExchange: 'user_exchange',
    bindingKey: 'friend_matching',
  },
  {
    name: 'review_user_info_queue',
    durable: true,
    bindToExchange: 'user_exchange',
    bindingKey: 'review',
  },
];
