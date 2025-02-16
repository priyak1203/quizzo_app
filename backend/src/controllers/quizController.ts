import { Request, Response } from 'express';
import { BadRequestError, NotFoundError } from '../errors/customError';
import db from '../../db/prisma';
import { StatusCodes } from 'http-status-codes';

// Create Quiz
export const createQuiz = async (req: Request, res: Response) => {
  const { title, description, teacherId } = req.body;

  if (!title || !description || !teacherId) {
    throw new BadRequestError(`Please provide title, description, teacherId`);
  }

  const quiz = await db.quiz.create({
    data: {
      title,
      description,
      teacherId,
    },
  });

  res.status(StatusCodes.CREATED).json({ msg: 'quiz created' });
};

// Get All Quiz
export const getAllQuiz = async (req: Request, res: Response) => {
  const teacherId: string = req.query.teacherId as string;

  if (!teacherId) {
    throw new BadRequestError(`Please provide teacher info`);
  }

  const quizzes = await db.quiz.findMany({
    where: {
      teacherId,
    },
  });

  if (quizzes.length < 1) {
    throw new NotFoundError(`No quizzes to display`);
  }

  res.status(StatusCodes.OK).json({ quizzes });
};

// Get Single Quiz
export const getSingleQuiz = async (req: Request, res: Response) => {
  const { id } = req.params;
  const teacherId: string = req.query.teacherId as string;

  if (!teacherId) {
    throw new BadRequestError(`Please provide teacher info`);
  }

  const quiz = await db.quiz.findUnique({
    where: {
      id,
      teacherId,
    },
  });

  if (!quiz) {
    throw new NotFoundError(`Quiz doesnt exist`);
  }

  res.status(StatusCodes.OK).json({ quiz });
};

// Update Quiz
export const updateQuiz = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description } = req.body;
  const teacherId: string = req.query.teacherId as string;

  if (!teacherId) {
    throw new BadRequestError(`Please provide teacher info`);
  }

  const quiz = await db.quiz.findUnique({
    where: {
      id,
      teacherId,
    },
  });

  if (!quiz) {
    throw new NotFoundError(`Quiz doesnt exist`);
  }

  await db.quiz.update({
    where: {
      id,
      teacherId,
    },
    data: {
      title,
      description,
    },
  });

  res.status(StatusCodes.OK).json({ msg: 'quiz updated' });
};

// Delete Quiz
export const deleteQuiz = async (req: Request, res: Response) => {
  const { id } = req.params;
  const teacherId: string = req.query.teacherId as string;

  if (!teacherId) {
    throw new BadRequestError(`Please provide teacher info`);
  }

  const quiz = await db.quiz.findUnique({
    where: {
      id,
      teacherId,
    },
  });

  if (!quiz) {
    throw new NotFoundError(`Quiz doesnt exist`);
  }

  await db.quiz.delete({
    where: {
      id,
    },
  });

  res.status(StatusCodes.OK).json({ msg: 'quiz deleted' });
};
