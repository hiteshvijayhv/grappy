import { connectDB } from '../config/db.js';
import { consumer } from '../config/kafka.js';
import { env } from '../config/env.js';
import { DailyStat } from '../models/DailyStat.js';
import { Link } from '../models/Link.js';

function dateKey(isoDate) {
  return new Date(isoDate).toISOString().slice(0, 10);
}

async function run() {
  await connectDB();
  await consumer.connect();
  await consumer.subscribe({ topic: env.kafkaTopic, fromBeginning: false });

  await consumer.run({
    eachMessage: async ({ message }) => {
      const payload = JSON.parse(message.value.toString());
      const key = dateKey(payload.date);

      if (payload.type === 'profile_view') {
        await DailyStat.findOneAndUpdate(
          { profileId: payload.profileId, linkId: payload.profileId, date: key },
          { $inc: { views: 1 }, $setOnInsert: { clicks: 0 } },
          { upsert: true }
        );
      }

      if (payload.type === 'link_click') {
        const link = await Link.findById(payload.linkId);
        if (!link) return;
        await DailyStat.findOneAndUpdate(
          { profileId: link.profileId, linkId: link._id, date: key },
          { $inc: { clicks: 1 }, $setOnInsert: { views: 0 } },
          { upsert: true }
        );
      }
    }
  });

  console.log('Analytics worker running');
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
