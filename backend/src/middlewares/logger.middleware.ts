import type { NextFunction, Request, Response } from 'express';

import { logger } from '../services/logger.service.js';

function log(req: Request, _res: Response, next: NextFunction): void {
  logger.info(`${req.method} ${req.originalUrl}`);
  next();
}

export { log };
