import { Router } from 'express';
import { asyncRoute } from '../../utils/async-handler.util.js';

import { addTask, deleteTask, getTaskById, getTasks, updateTask } from './task.controller.js';

const router = Router();

router.get('/', asyncRoute(getTasks));
router.get('/:id', asyncRoute(getTaskById));
router.post('/', asyncRoute(addTask));
router.put('/:id', asyncRoute(updateTask));
router.delete('/:id', asyncRoute(deleteTask));

export default router;
