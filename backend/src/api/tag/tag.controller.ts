import { Request, Response } from 'express';

import { NewTag } from '../../models/tag.model.js';
import { logger } from '../../services/logger.service.js';
import * as tagService from './tag.service.js';

export async function getTags(req: Request, res: Response): Promise<void> {
  try {
    const tags = await tagService.query();
    res.json(tags);
  } catch (err) {
    logger.error('GET /api/tag failed', err);
    res.status(500).json({ error: 'Failed to fetch tags' });
  }
}

export async function getTagById(req: Request, res: Response): Promise<void | Response> {
  try {
    const tag = await tagService.getById(req.params.id);
    if (!tag) return res.status(404).json({ error: 'Tag not found' });
    res.json(tag);
  } catch (err) {
    logger.error(`GET /api/tag/${req.params.id} failed`, err);
    res.status(500).json({ error: 'Failed to fetch tag' });
  }
}

export async function addTag(req: Request, res: Response): Promise<void | Response> {
  try {
    const newTag = req.body as NewTag;

    if (!newTag.name?.trim()) {
      return res.status(400).json({ error: 'Tag name is required' });
    }

    const saved = await tagService.add({ name: newTag.name.trim() });
    res.status(201).json(saved);
  } catch (err) {
    logger.error('POST /api/tag failed', err);
    res.status(500).json({ error: 'Failed to add tag' });
  }
}

export async function updateTag(req: Request, res: Response): Promise<void | Response> {
  try {
    const { name } = req.body as Partial<NewTag>;
    if (name !== undefined && !name.trim()) {
      return res.status(400).json({ error: 'Tag name must be a non-empty string' });
    }

    const saved = await tagService.update(req.params.id, { name: name?.trim() });
    if (!saved) return res.status(404).json({ error: 'Tag not found' });
    res.json(saved);
  } catch (err) {
    logger.error(`PUT /api/tag/${req.params.id} failed`, err);
    res.status(500).json({ error: 'Failed to update tag' });
  }
}

export async function deleteTag(req: Request, res: Response): Promise<void> {
  try {
    await tagService.remove(req.params.id);
    res.status(204).end();
  } catch (err) {
    logger.error(`DELETE /api/tag/${req.params.id} failed`, err);
    res.status(500).json({ error: 'Failed to delete tag' });
  }
}
