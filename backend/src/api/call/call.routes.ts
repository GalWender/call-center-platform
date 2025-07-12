import { Router } from 'express';
import { asyncHandler } from '../../utils/async-handler.util.js';
import { addCall, deleteCall, getCallById, getCalls, updateCall } from './call.controller.js';

const router = Router();

router.get('/', asyncHandler(getCalls));
router.get('/:id', asyncHandler(getCallById));
router.post('/', asyncHandler(addCall));
router.put('/:id', asyncHandler(updateCall));
router.delete('/:id', asyncHandler(deleteCall));

export default router;
