import { Router } from 'express';
import { asyncRoute } from '../../utils/async-handler.util.js';

import { addTag, deleteTag, getTagById, getTags, updateTag } from './tag.controller.js';

const router = Router();

router.get('/', asyncRoute(getTags));
router.get('/:id', asyncRoute(getTagById));
router.post('/', asyncRoute(addTag));
router.put('/:id', asyncRoute(updateTag));
router.delete('/:id', asyncRoute(deleteTag));

export default router;
