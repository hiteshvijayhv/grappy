import bcrypt from 'bcryptjs';
import { connectDB } from '../src/config/db.js';
import { User } from '../src/models/User.js';
import { Profile } from '../src/models/Profile.js';
import { Link } from '../src/models/Link.js';

async function seed() {
  await connectDB();
  await User.deleteMany({});
  await Profile.deleteMany({});
  await Link.deleteMany({});

  const user = await User.create({
    email: 'demo@grappy.app',
    passwordHash: await bcrypt.hash('demo1234', 10)
  });

  const profile = await Profile.create({
    userId: user._id,
    username: 'demo',
    displayName: 'Demo Creator',
    bio: 'Scalable link sharing profile.'
  });

  await Link.insertMany([
    { profileId: profile._id, title: 'Portfolio', url: 'https://example.com', position: 1 },
    { profileId: profile._id, title: 'Newsletter', url: 'https://example.com/news', position: 2 }
  ]);

  console.log('Seed complete');
  process.exit(0);
}

seed();
