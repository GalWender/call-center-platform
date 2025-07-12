import 'dotenv/config';

import cookieParser from 'cookie-parser';
import cors, { CorsOptions } from 'cors';
import express, { Express } from 'express';
import { Server as HttpServer, createServer } from 'http';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

import callRoutes from './api/call/call.routes.js';
import suggestedTaskRoutes from './api/suggested-task/suggested-task.routes.js';
import tagRoutes from './api/tag/tag.routes.js';
import taskRoutes from './api/task/task.routes.js';
import { logger } from './services/logger.service.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app: Express = express();
const http: HttpServer = createServer(app);

app.use(cookieParser());
app.use(express.json());

const allowedOrigins: string[] = [];
if (process.env.FRONTEND_URL) {
  allowedOrigins.push(...process.env.FRONTEND_URL.split(','));
}

allowedOrigins.push('http://127.0.0.1:5173', 'http://localhost:5173');

const corsOptions: CorsOptions = {
  origin: allowedOrigins,
  credentials: true,
};
app.use(cors(corsOptions));

app.use('/api/tag', tagRoutes);
app.use('/api/suggested-task', suggestedTaskRoutes);
app.use('/api/task', taskRoutes);
app.use('/api/call', callRoutes);


const port = process.env.PORT || 3030;
http.listen(port, () => {
  logger.info(`Server is running on port: ${port}`);
});
