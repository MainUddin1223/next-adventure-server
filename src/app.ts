import cores from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import router from './router';
import config from './config';

const app: Application = express();
app.use(cores());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(config.api_route as string, router);

app.use('/test', (req, res) => {
  const message = `Server is running ${new Date()}`;
  res.status(StatusCodes.OK).json({
    message,
  });
});

app.get('', (req, res) => {
  const message = `Server is running `;
  res.status(StatusCodes.OK).json({
    message,
  });
});

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(StatusCodes.NOT_FOUND).json({
    success: false,
    message: 'Not found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API not found',
      },
    ],
  });
  next();
});

export default app;
