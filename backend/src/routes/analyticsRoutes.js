import { Router } from 'express';
import { clickRedirect, getAnalytics } from '../controllers/analyticsController.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();
router.post('/click/:linkId', clickRedirect);
router.get('/me', requireAuth, getAnalytics);

export default router;
