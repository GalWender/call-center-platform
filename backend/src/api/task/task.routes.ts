import { Router } from 'express';
import { asyncHandler } from '../../utils/async-handler.util.js';

import { addTask, deleteTask, getTaskById, getTasks, updateTask } from './task.controller.js';

const router = Router();

router.get('/', asyncHandler(getTasks));
router.get('/:id', asyncHandler(getTaskById));
router.post('/', asyncHandler(addTask));
router.put('/:id', asyncHandler(updateTask));
router.delete('/:id', asyncHandler(deleteTask));

export default router;
