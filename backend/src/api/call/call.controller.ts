import { Request, Response } from 'express';

import { NewCall } from '../../models/call.model.js';
import { logger } from '../../services/logger.service.js';
import * as callService from './call.service.js';

export async function getCalls(req: Request, res: Response): Promise<void> {
  try {
    const calls = await callService.query();
    res.json(calls);
  } catch (err) {
    logger.error('GET /api/call failed', err);
    res.status(500).json({ error: 'Failed to fetch calls' });
  }
}

export async function getCallById(req: Request, res: Response): Promise<void | Response> {
  try {
    const call = await callService.getById(req.params.id);
    if (!call) return res.status(404).json({ error: 'Call not found' });
    res.json(call);
  } catch (err) {
    logger.error(`GET /api/call/${req.params.id} failed`, err);
    res.status(500).json({ error: 'Failed to fetch call' });
  }
}

export async function addCall(req: Request, res: Response): Promise<void | Response> {
  try {
    const newCall = req.body as NewCall;

    if (!newCall.subject?.trim()) {
      return res.status(400).json({ error: 'Subject is required' });
    }

    const saved = await callService.add({
      subject: newCall.subject.trim(),
      tagIds: newCall.tagIds,
      tasks: newCall.tasks,
    });
    res.status(201).json(saved);
  } catch (err) {
    logger.error('POST /api/call failed', err);
    res.status(500).json({ error: 'Failed to add call' });
  }
}

export async function updateCall(req: Request, res: Response): Promise<void | Response> {
  try {
    const { subject, tagIds, tasks } = req.body as Partial<NewCall>;

    if (subject !== undefined && !subject.trim()) {
      return res.status(400).json({ error: 'Subject must be a non-empty string' });
    }

    const saved = await callService.update(req.params.id, {
      subject: subject?.trim(),
      tagIds,
      tasks,
    });
    if (!saved) return res.status(404).json({ error: 'Call not found' });
    res.json(saved);
  } catch (err) {
    logger.error(`PUT /api/call/${req.params.id} failed`, err);
    res.status(500).json({ error: 'Failed to update call' });
  }
}

export async function deleteCall(req: Request, res: Response): Promise<void> {
  try {
    await callService.remove(req.params.id);
    res.status(204).end();
  } catch (err) {
    logger.error(`DELETE /api/call/${req.params.id} failed`, err);
    res.status(500).json({ error: 'Failed to delete call' });
  }
}
