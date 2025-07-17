import { Router } from 'express';
import { asyncRoute } from '../../utils/async-handler.util.js';
import { addCall, deleteCall, getCallById, getCalls, updateCall } from './call.controller.js';

const router = Router();

router.get('/', asyncRoute(getCalls));
router.get('/:id', asyncRoute(getCallById));
router.post('/', asyncRoute(addCall));
router.put('/:id', asyncRoute(updateCall));
router.delete('/:id', asyncRoute(deleteCall));

export default router;
