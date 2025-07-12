import { Router } from 'express';
import { asyncHandler } from '../../utils/async-handler.util.js';

import {
  addSuggestedTask,
  deleteSuggestedTask,
  getSuggestedTaskById,
  getSuggestedTasks,
  updateSuggestedTask,
} from './suggested-task.controller.js';

const router = Router();

router.get('/', asyncHandler(getSuggestedTasks));
router.get('/:id', asyncHandler(getSuggestedTaskById));
router.post('/', asyncHandler(addSuggestedTask));
router.put('/:id', asyncHandler(updateSuggestedTask));
router.delete('/:id', asyncHandler(deleteSuggestedTask));

export default router;
