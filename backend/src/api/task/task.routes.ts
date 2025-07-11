import { Router } from 'express';

import { addTask, deleteTask, getTaskById, getTasks, updateTask } from './task.controller.js';

const router = Router();

router.get('/', getTasks);
router.get('/:id', getTaskById);
router.post('/', addTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;
