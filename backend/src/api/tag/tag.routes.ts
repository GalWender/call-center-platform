import { Router } from 'express';

import { addTag, deleteTag, getTagById, getTags, updateTag } from './tag.controller.js';

const router = Router();

router.get('/', getTags);
router.get('/:id', getTagById);
router.post('/', addTag);
router.put('/:id', updateTag);
router.delete('/:id', deleteTag);

export default router;
