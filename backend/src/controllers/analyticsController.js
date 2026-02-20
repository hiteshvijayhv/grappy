import { DailyStat } from '../models/DailyStat.js';
import { publishEvent } from '../services/eventService.js';

export async function clickRedirect(req, res) {
  const { linkId } = req.params;

  await publishEvent({
    type: 'link_click',
    linkId,
    date: new Date().toISOString(),
    requestId: req.headers['x-request-id'] || 'n/a'
  });

  return res.json({ ok: true });
}

export async function getAnalytics(req, res) {
  const stats = await DailyStat.find({ profileId: req.user.profileId }).sort({ date: -1 }).limit(60);
  return res.json(stats);
}
