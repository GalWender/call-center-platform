import { Router } from 'express';
import { asyncRoute } from '../../utils/async-handler.util.js';

import {
  addSuggestedTask,
  deleteSuggestedTask,
  getSuggestedTaskById,
  getSuggestedTasks,
  updateSuggestedTask,
} from './suggested-task.controller.js';

const router = Router();

router.get('/', asyncRoute(getSuggestedTasks));
router.get('/:id', asyncRoute(getSuggestedTaskById));
router.post('/', asyncRoute(addSuggestedTask));
router.put('/:id', asyncRoute(updateSuggestedTask));
router.delete('/:id', asyncRoute(deleteSuggestedTask));

export default router;
