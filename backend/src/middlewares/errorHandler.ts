import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

type CustomErrorType = Error & { statusCode: number };

const errorHandler = (
  err: CustomErrorType,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  const msg = err.message || `Something went wrong, try again later`;
  res.status(statusCode).json({ msg });
};

export default errorHandler;
