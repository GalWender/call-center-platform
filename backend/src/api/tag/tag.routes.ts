import { Router } from 'express';
import { asyncHandler } from '../../utils/async-handler.util.js';

import { addTag, deleteTag, getTagById, getTags, updateTag } from './tag.controller.js';

const router = Router();

router.get('/', asyncHandler(getTags));
router.get('/:id', asyncHandler(getTagById));
router.post('/', asyncHandler(addTag));
router.put('/:id', asyncHandler(updateTag));
router.delete('/:id', asyncHandler(deleteTag));

export default router;
