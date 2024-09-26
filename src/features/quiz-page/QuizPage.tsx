
import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../../common/components/Button";
import { randomizeArray } from "../../utils/randomizeArray";
import { AnswerOptions } from "./components/AnswerOptions";
import { QuizQuestion } from "../../common/types/QuizQuestion";
import styles from './QuizPage.module.css';

interface LocationState {
  quizQuestions: QuizQuestion[];
}

export const QuizPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { quizQuestions } = location?.state as LocationState;
  const [points, setPoints] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const quizQuestion = quizQuestions[questionNumber - 1];
  const correctAnswer = quizQuestion.correct_answer;
  const incorrectAnswers = quizQuestion.incorrect_answers;
  const answerOptions = useMemo(() => randomizeArray([correctAnswer, ...incorrectAnswers]), [correctAnswer, incorrectAnswers]);

  const getAnswerStyles = (answerOption: string): React.CSSProperties => {
    const style: React.CSSProperties = {};
    const selectedAnswer = selectedAnswers[questionNumber - 1];
    const isAnswered = Boolean(selectedAnswer);
    const isSelected = selectedAnswer === answerOption;
    const isCorrect = correctAnswer === answerOption;

    if (isSelected) style.backgroundColor = "#a7a3a3";
    if (isAnswered) {
      style.borderColor = isCorrect ? "#59b841" : (isSelected ? "red" : undefined);
    }

    return style;
  };

  const selectAnswer = (answer: string) => {
    if (answer === correctAnswer) {
      setPoints(prev => prev + 1);
    }
    setSelectedAnswers(prev => [...prev, answer]);
  };

  const nextQuestion = () => setQuestionNumber(prev => prev + 1);

  const goToResults = () => {
    navigate("/results", { state: { quizQuestions, selectedAnswers, points } });
  };

  return (
    <>
      <div className={styles.progressContainer}>
        <div className={styles.progressItem}>Points: {points}/{quizQuestions.length}</div>
        <div className={styles.progressItem}>Question: {questionNumber}/{quizQuestions.length}</div>
      </div>
      <h2>{quizQuestion.question}</h2>
      <AnswerOptions
        answers={answerOptions}
        disabled={!!selectedAnswers[questionNumber - 1]}
        onClick={selectAnswer}
        getAnswerStyles={getAnswerStyles}
      />
      {selectedAnswers.length === quizQuestions.length ?
        <Button onClick={goToResults}>See results</Button> :
        <Button onClick={nextQuestion}>Next Question</Button>
      }
    </>
  );
};
