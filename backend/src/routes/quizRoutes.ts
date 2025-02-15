import { Router } from 'express';
import {
  createQuiz,
  deleteQuiz,
  getAllQuiz,
  getSingleQuiz,
  updateQuiz,
} from '../controllers/quizController';

const router = Router();

router.route('/').post(createQuiz).get(getAllQuiz);
router.route('/:id').get(getSingleQuiz).patch(updateQuiz).delete(deleteQuiz);

export default router;
