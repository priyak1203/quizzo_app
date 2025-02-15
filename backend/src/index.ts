import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import 'express-async-errors';

// other packages
import helmet from 'helmet';
import cors from 'cors';

dotenv.config();

const app: Express = express();

// routers
import authRouter from './routes/authRoutes';
import quizRouter from './routes/quizRoutes';

// error handlers
import errorHandler from './middlewares/errorHandler';

// middlewares
app.set('trust proxy', 1);
app.use(helmet());
app.use(cors());
app.use(express.json());

// routes
app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/quiz', quizRouter);

// Error handler middleware
app.use(errorHandler);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
