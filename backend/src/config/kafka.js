import { Kafka, logLevel } from 'kafkajs';
import { env } from './env.js';

const kafka = new Kafka({
  clientId: env.kafkaClientId,
  brokers: env.kafkaBrokers,
  logLevel: env.nodeEnv === 'development' ? logLevel.NOTHING : logLevel.ERROR
});

export const producer = kafka.producer();
export const consumer = kafka.consumer({ groupId: 'analytics-worker-group' });

export async function connectProducer() {
  await producer.connect();
  console.log('Kafka producer connected');
}
