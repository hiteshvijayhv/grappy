import { Link } from '../models/Link.js';

export async function createLink(req, res) {
  const currentCount = await Link.countDocuments({ profileId: req.user.profileId });
  const link = await Link.create({ ...req.body, profileId: req.user.profileId, position: currentCount + 1 });
  return res.status(201).json(link);
}

export async function updateLink(req, res) {
  const link = await Link.findOneAndUpdate(
    { _id: req.params.id, profileId: req.user.profileId },
    req.body,
    { new: true }
  );
  if (!link) return res.status(404).json({ message: 'Link not found' });
  return res.json(link);
}

export async function deleteLink(req, res) {
  const link = await Link.findOneAndDelete({ _id: req.params.id, profileId: req.user.profileId });
  if (!link) return res.status(404).json({ message: 'Link not found' });
  return res.status(204).send();
}

export async function reorderLinks(req, res) {
  const { links } = req.body;
  await Promise.all(
    links.map((item, idx) =>
      Link.updateOne({ _id: item.id, profileId: req.user.profileId }, { $set: { position: idx + 1 } })
    )
  );
  const updated = await Link.find({ profileId: req.user.profileId }).sort({ position: 1 });
  return res.json(updated);
}
