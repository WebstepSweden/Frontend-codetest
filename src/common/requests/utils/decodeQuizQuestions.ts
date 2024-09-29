import he from "he";
import { EncodedQuizQuestion } from "../quizRequest";
import { QuizQuestion } from "../../types/QuizQuestion";

export const decodeQuizQuestions = (
  quizQuestions: EncodedQuizQuestion[]
): QuizQuestion[] => {
  return quizQuestions.map(q => {
    return {
      ...q,
      question: he.decode(q.question),
      correct_answer: he.decode(q.correct_answer),
      incorrect_answers: q.incorrect_answers.map(answer => he.decode(answer)),
    };
  });
};
