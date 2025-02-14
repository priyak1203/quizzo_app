import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import 'express-async-errors';

dotenv.config();

const app: Express = express();

// routers
import authRouter from './routes/authRoutes';

// error handlers
import errorHandler from './middlewares/errorHandler';

// middlewares
app.use(express.json());

// routes
app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.use('/api/v1/auth', authRouter);

// Error handler middleware
app.use(errorHandler);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
