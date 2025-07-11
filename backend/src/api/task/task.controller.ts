import { Request, Response } from 'express';

import { NewTask, TaskStatus } from '../../models/task.model.js';
import { logger } from '../../services/logger.service.js';
import * as taskService from './task.service.js';

export async function getTasks(req: Request, res: Response): Promise<void> {
  try {
    const tasks = await taskService.query();
    res.json(tasks);
  } catch (err) {
    logger.error('GET /api/task failed', err);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
}

export async function getTaskById(req: Request, res: Response): Promise<void | Response> {
  try {
    const task = await taskService.getById(req.params.id);
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json(task);
  } catch (err) {
    logger.error(`GET /api/task/${req.params.id} failed`, err);
    res.status(500).json({ error: 'Failed to fetch task' });
  }
}

function isValidStatus(value: unknown): value is TaskStatus {
  return typeof value === 'string' && Object.values(TaskStatus).includes(value as TaskStatus);
}

export async function addTask(req: Request, res: Response): Promise<void | Response> {
  try {
    const body = req.body as Partial<NewTask>;

    if (!body.title?.trim()) {
      return res.status(400).json({ error: 'Title is required' });
    }

    if (body.status && !isValidStatus(body.status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    if (body.tagIds !== undefined && !Array.isArray(body.tagIds)) {
      return res.status(400).json({ error: 'tagIds must be an array of tag IDs' });
    }

    const saved = await taskService.add({
      title: body.title.trim(),
      status: body.status ?? TaskStatus.OPEN,
      tagIds: body.tagIds,
    });
    res.status(201).json(saved);
  } catch (err) {
    logger.error('POST /api/task failed', err);
    res.status(500).json({ error: 'Failed to add task' });
  }
}

export async function updateTask(req: Request, res: Response): Promise<void | Response> {
  try {
    const body = req.body as Partial<NewTask>;

    if (body.title !== undefined && !body.title.trim()) {
      return res.status(400).json({ error: 'Title must be a non-empty string' });
    }

    if (body.status !== undefined && !isValidStatus(body.status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    if (body.tagIds !== undefined && !Array.isArray(body.tagIds)) {
      return res.status(400).json({ error: 'tagIds must be an array of tag IDs' });
    }

    const saved = await taskService.update(req.params.id, {
      title: body.title?.trim(),
      status: body.status,
      tagIds: body.tagIds,
    });
    if (!saved) return res.status(404).json({ error: 'Task not found' });
    res.json(saved);
  } catch (err) {
    logger.error(`PUT /api/task/${req.params.id} failed`, err);
    res.status(500).json({ error: 'Failed to update task' });
  }
}

export async function deleteTask(req: Request, res: Response): Promise<void> {
  try {
    await taskService.remove(req.params.id);
    res.status(204).end();
  } catch (err) {
    logger.error(`DELETE /api/task/${req.params.id} failed`, err);
    res.status(500).json({ error: 'Failed to delete task' });
  }
}
