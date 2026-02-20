import { Router } from 'express';
import { getMyProfile, getPublicProfile, updateMyProfile } from '../controllers/profileController.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();
router.get('/me', requireAuth, getMyProfile);
router.put('/me', requireAuth, updateMyProfile);
router.get('/:username', getPublicProfile);

export default router;
