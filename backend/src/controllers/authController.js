import bcrypt from 'bcryptjs';
import { User } from '../models/User.js';
import { Profile } from '../models/Profile.js';
import { signToken } from '../utils/jwt.js';

export async function register(req, res) {
  const { email, password, username, displayName } = req.body;
  const exists = await User.findOne({ email: email.toLowerCase() });
  if (exists) return res.status(400).json({ message: 'Email already exists' });

  const usernameTaken = await Profile.findOne({ username: username.toLowerCase() });
  if (usernameTaken) return res.status(400).json({ message: 'Username already taken' });

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({ email, passwordHash });
  const profile = await Profile.create({
    userId: user._id,
    username,
    displayName: displayName || username
  });

  const token = signToken({ userId: user._id.toString(), profileId: profile._id.toString() });
  return res.status(201).json({ token, profile });
}

export async function login(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) return res.status(401).json({ message: 'Invalid credentials' });

  const profile = await Profile.findOne({ userId: user._id });
  const token = signToken({ userId: user._id.toString(), profileId: profile._id.toString() });
  return res.json({ token, profile });
}
