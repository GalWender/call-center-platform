import { Router } from 'express';

import {
  addSuggestedTask,
  deleteSuggestedTask,
  getSuggestedTaskById,
  getSuggestedTasks,
  updateSuggestedTask,
} from './suggested-task.controller.js';

const router = Router();

router.get('/', getSuggestedTasks);
router.get('/:id', getSuggestedTaskById);
router.post('/', addSuggestedTask);
router.put('/:id', updateSuggestedTask);
router.delete('/:id', deleteSuggestedTask);

export default router;
