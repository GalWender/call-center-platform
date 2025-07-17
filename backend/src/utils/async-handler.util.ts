import type { Request, Response } from 'express';

export const asyncRoute = (fn: (req: Request, res: Response) => Promise<void | Response>) => {
  return function handler(req: Request, res: Response) {
    void fn(req, res);
  };
};
