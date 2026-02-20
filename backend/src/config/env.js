import dotenv from 'dotenv';

dotenv.config();

export const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT || 4000),
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/grappy',
  jwtSecret: process.env.JWT_SECRET || 'change-me',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  kafkaBrokers: (process.env.KAFKA_BROKERS || 'localhost:9092').split(','),
  kafkaClientId: process.env.KAFKA_CLIENT_ID || 'grappy-api',
  kafkaTopic: process.env.KAFKA_TOPIC || 'link-events',
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000'
};
