import { Request, Response } from 'express';
import {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
} from '../errors/customError';
import db from '../../db/prisma';
import { StatusCodes } from 'http-status-codes';
import bcrypt from 'bcryptjs';

const renderError = (error: unknown): { message: string } => {
  return {
    message: error instanceof Error ? error.message : 'An error occured',
  };
};

// Register Teacher
export const register = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new BadRequestError(`Please provide username and password`);
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    await db.teacher.create({
      data: {
        username,
        password: hashedPassword,
      },
    });
  } catch (error) {
    renderError(error);
  }

  res.status(StatusCodes.CREATED).json({ msg: 'teacher created' });
};

// Login Teacher
export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new BadRequestError(`Please provide username and password`);
  }

  // Find the teacher
  const teacher = await db.teacher.findFirst({
    where: {
      username,
    },
  });

  // throw error if teacher is not registered
  if (!teacher) {
    throw new NotFoundError(`Teacher is not registered`);
  }

  // Check for password match
  const isMatch = await bcrypt.compare(password, teacher.password);

  // Throw error if password doesnt match
  if (!isMatch) {
    throw new UnauthenticatedError(`Invalid Credentials`);
  }

  res
    .status(StatusCodes.OK)
    .json({
      msg: 'User logged in',
      user: { username: teacher.username, id: teacher.id },
    });
};
