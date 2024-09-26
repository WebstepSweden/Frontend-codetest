import { CSSProperties } from "react";
import styles from './AnswerOptions.module.css';

interface AnswerOptionsProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
  answers: string[];
  getAnswerStyles: (answer: string) => CSSProperties;
  onClick: (answer: string) => void;
}

export const AnswerOptions = ({ answers, getAnswerStyles, onClick, ...buttonProps }: AnswerOptionsProps) => {
  return (
    <>
      {answers.map((answer, i) => {
        const answerStyles = getAnswerStyles(answer);
        return (
          <div className={styles.btnContainer} style={answerStyles}>
            <div className={styles.answerNumber} >{i + 1}</div>
            <button
              key={i} className={styles.btn} onClick={() => onClick(answer)} {...buttonProps}  >
              {answer}
            </button>
          </div>
        );
      })
      }
    </>
  );

};