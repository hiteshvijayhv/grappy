import { Profile } from '../models/Profile.js';
import { Link } from '../models/Link.js';
import { publishEvent } from '../services/eventService.js';

export async function getMyProfile(req, res) {
  const profile = await Profile.findById(req.user.profileId);
  const links = await Link.find({ profileId: profile._id }).sort({ position: 1 });
  return res.json({ profile, links });
}

export async function updateMyProfile(req, res) {
  const updates = req.body;
  const profile = await Profile.findByIdAndUpdate(req.user.profileId, updates, { new: true });
  return res.json(profile);
}

export async function getPublicProfile(req, res) {
  const { username } = req.params;
  const profile = await Profile.findOne({ username: username.toLowerCase() });
  if (!profile) return res.status(404).json({ message: 'Profile not found' });

  const links = await Link.find({ profileId: profile._id, isActive: true }).sort({ position: 1 });

  await publishEvent({
    type: 'profile_view',
    profileId: profile._id.toString(),
    date: new Date().toISOString(),
    requestId: req.headers['x-request-id'] || 'n/a'
  });

  return res.json({ profile, links });
}
