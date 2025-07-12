import { Request, Response } from 'express';

import { NewSuggestedTask } from '../../models/suggested-task.model.js';
import { logger } from '../../services/logger.service.js';
import * as suggestedTaskService from './suggested-task.service.js';

export async function getSuggestedTasks(req: Request, res: Response): Promise<void | Response> {
  try {
    const { tagIds } = req.query;

    if (tagIds === undefined) {
      const tasks = await suggestedTaskService.query();
      return res.json(tasks);
    }

    let filterTagIds: string[] = [];
    if (typeof tagIds === 'string') {
      filterTagIds = tagIds.split(',').filter(Boolean);
    } else if (Array.isArray(tagIds)) {
      filterTagIds = (tagIds as string[]).filter(Boolean);
    }

    if (filterTagIds.length === 0) {
      return res.json([]);
    }

    const tasks = await suggestedTaskService.query({ tagIds: filterTagIds });
    return res.json(tasks);
  } catch (err) {
    logger.error('GET /api/suggested-task failed', err);
    res.status(500).json({ error: 'Failed to fetch suggested tasks' });
  }
}

export async function getSuggestedTaskById(req: Request, res: Response): Promise<void | Response> {
  try {
    const task = await suggestedTaskService.getById(req.params.id);
    if (!task) return res.status(404).json({ error: 'Suggested task not found' });
    res.json(task);
  } catch (err) {
    logger.error(`GET /api/suggested-task/${req.params.id} failed`, err);
    res.status(500).json({ error: 'Failed to fetch suggested task' });
  }
}

export async function addSuggestedTask(req: Request, res: Response): Promise<void | Response> {
  try {
    const body = req.body as NewSuggestedTask;

    if (!body.title?.trim()) {
      return res.status(400).json({ error: 'Title is required' });
    }

    if (!Array.isArray(body.tagIds)) {
      return res.status(400).json({ error: 'tagIds must be an array of tag IDs' });
    }

    const saved = await suggestedTaskService.add({
      title: body.title.trim(),
      tagIds: body.tagIds,
    });
    res.status(201).json(saved);
  } catch (err) {
    logger.error('POST /api/suggested-task failed', err);
    res.status(500).json({ error: 'Failed to add suggested task' });
  }
}

export async function updateSuggestedTask(req: Request, res: Response): Promise<void | Response> {
  try {
    const body = req.body as Partial<NewSuggestedTask>;

    if (body.title !== undefined && !body.title.trim()) {
      return res.status(400).json({ error: 'Title must be a non-empty string' });
    }

    if (body.tagIds !== undefined && !Array.isArray(body.tagIds)) {
      return res.status(400).json({ error: 'tagIds must be an array of tag IDs' });
    }

    const saved = await suggestedTaskService.update(req.params.id, {
      title: body.title?.trim(),
      tagIds: body.tagIds,
    });
    if (!saved) return res.status(404).json({ error: 'Suggested task not found' });
    res.json(saved);
  } catch (err) {
    logger.error(`PUT /api/suggested-task/${req.params.id} failed`, err);
    res.status(500).json({ error: 'Failed to update suggested task' });
  }
}

export async function deleteSuggestedTask(req: Request, res: Response): Promise<void> {
  try {
    await suggestedTaskService.remove(req.params.id);
    res.status(204).end();
  } catch (err) {
    logger.error(`DELETE /api/suggested-task/${req.params.id} failed`, err);
    res.status(500).json({ error: 'Failed to delete suggested task' });
  }
}
