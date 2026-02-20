import { producer } from '../config/kafka.js';
import { env } from '../config/env.js';

export async function publishEvent(event) {
  await producer.send({
    topic: env.kafkaTopic,
    messages: [{ value: JSON.stringify(event) }]
  });
}
