import { useLocation } from 'react-router-dom';
import { QuizQuestion } from '../../common/types/QuizQuestion';
import styles from './QuizResultsPage.module.css';

interface LocationState {
  quizQuestions: QuizQuestion[];
  selectedAnswers: string[];
  points: number;
}

export const QuizResultsPage = () => {
  const location = useLocation();
  const { quizQuestions, selectedAnswers, points } = location?.state as LocationState;

  return (
    <div className={styles.container}>
      <h2>Quiz Results Summary</h2>
      <p className={styles.subtitle}>You answered correctly on {points} out of {quizQuestions.length} questions:</p>
      <ul>
        {quizQuestions.map((q, i) => (
          <li key={i} className={styles.quizItem}>
            <h3>Question {i + 1}: {q.question}</h3>
            <p>Correct Answer: <span className={styles.correct}>{q.correct_answer}</span></p>
            <p>
              Your Answer:{" "}
              <span className={q.correct_answer === selectedAnswers[i] ? styles.correct : styles.incorrect}>
                {" "}{selectedAnswers[i]}
              </span>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};