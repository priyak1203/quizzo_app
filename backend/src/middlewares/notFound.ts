import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

const notFoundHandler = (req: Request, res: Response) => {
  res
    .status(StatusCodes.NOT_FOUND)
    .json({ msg: `Oops!!! Route does not exist!` });
};

export default notFoundHandler;
