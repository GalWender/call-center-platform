import 'dotenv/config';

import cookieParser from 'cookie-parser';
import cors, { CorsOptions } from 'cors';
import express, { Express, Request, Response } from 'express';
import { Server as HttpServer, createServer } from 'http';
import { dirname, join, resolve } from 'path';
import { fileURLToPath } from 'url';

import suggestedTaskRoutes from './api/suggested-task/suggested-task.routes.js';
import tagRoutes from './api/tag/tag.routes.js';
import { logger } from './services/logger.service.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app: Express = express();
const http: HttpServer = createServer(app);

app.use(cookieParser());
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(resolve(__dirname, '..', 'public')));
} else {
  const corsOptions: CorsOptions = {
    origin: ['http://127.0.0.1:5173', 'http://localhost:5173'],
    credentials: true,
  };
  app.use(cors(corsOptions));
}

app.use('/api/tag', tagRoutes);
app.use('/api/suggested-task', suggestedTaskRoutes);

app.get('/**', (req: Request, res: Response) => {
  res.sendFile(join(__dirname, '..', 'public', 'index.html'));
});

const port = process.env.PORT || 3030;
http.listen(port, () => {
  logger.info(`Server is running on port: ${port}`);
});
