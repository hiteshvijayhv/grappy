import { app } from './app.js';
import { connectDB } from './config/db.js';
import { connectProducer } from './config/kafka.js';
import { env } from './config/env.js';

async function start() {
  await connectDB();
  await connectProducer();
  app.listen(env.port, () => {
    console.log(`API listening on ${env.port}`);
  });
}

start().catch((err) => {
  console.error(err);
  process.exit(1);
});
