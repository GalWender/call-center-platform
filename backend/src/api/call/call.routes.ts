import { Router } from 'express';
import { addCall, deleteCall, getCallById, getCalls, updateCall } from './call.controller.js';

const router = Router();

router.get('/', getCalls);
router.get('/:id', getCallById);
router.post('/', addCall);
router.put('/:id', updateCall);
router.delete('/:id', deleteCall);

export default router;
