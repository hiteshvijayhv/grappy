import { Router } from 'express';
import { createLink, deleteLink, reorderLinks, updateLink } from '../controllers/linkController.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();
router.post('/', requireAuth, createLink);
router.put('/reorder', requireAuth, reorderLinks);
router.put('/:id', requireAuth, updateLink);
router.delete('/:id', requireAuth, deleteLink);

export default router;
