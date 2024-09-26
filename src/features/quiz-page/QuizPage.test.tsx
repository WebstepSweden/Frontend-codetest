import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, useLocation, useNavigate } from 'react-router-dom';
import { QuizPage } from './QuizPage';
import { QuizQuestion } from '../../common/types/QuizQuestion';
import { randomizeArray } from '../../utils/randomizeArray';

jest.mock('react-router-dom', () => ({
  useLocation: jest.fn(),
  useNavigate: jest.fn(),
}));

jest.mock('../../utils/randomizeArray', () => ({
  randomizeArray: jest.fn(),
}));

const mockNavigate = jest.fn();
const mockQuizQuestions: QuizQuestion[] = [
  {
    question: 'What is 10 + 10?',
    correct_answer: '20',
    incorrect_answers: ['10', '5', '0'],
    category: '',
    type: '',
    difficulty: ''
  },
  {
    question: 'What is the capital of France?',
    correct_answer: 'Paris',
    incorrect_answers: ['London', 'Berlin', 'Rome'],
    category: '',
    type: '',
    difficulty: ''
  },
];

describe('QuizPage Component', () => {
  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (useLocation as jest.Mock).mockReturnValue({
      state: { quizQuestions: mockQuizQuestions },
    });
    (randomizeArray as jest.Mock).mockImplementation((arr) => arr); // Keep the order for testing purposes
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders quiz page with initial question, answers and points', () => {
    render(<QuizPage />, { wrapper: MemoryRouter });

    expect(screen.getByText('Points: 0/2')).toBeInTheDocument();
    expect(screen.getByText('Question: 1/2')).toBeInTheDocument();
    expect(screen.getByText('What is 10 + 10?')).toBeInTheDocument();

    const answerButtons = screen.getAllByRole('button', { name: /\d/ });
    expect(answerButtons.length).toBe(4);
    expect(answerButtons[0].textContent).toBe('20');
    expect(answerButtons[1].textContent).toBe('10');
    expect(answerButtons[2].textContent).toBe('5');
    expect(answerButtons[3].textContent).toBe('0');
  });

  test('selecting the correct answer updates points and UI', () => {
    render(<QuizPage />, { wrapper: MemoryRouter });

    const correctAnswerButton = screen.getByRole('button', { name: "20" });
    // eslint-disable-next-line testing-library/no-node-access
    const buttonContainer = correctAnswerButton.closest('.btnContainer');
    fireEvent.click(correctAnswerButton);

    expect(screen.getByText('Points: 1/2')).toBeInTheDocument();
    expect(correctAnswerButton).toBeDisabled();
    expect(buttonContainer).toHaveStyle('background-color: #a7a3a3');
    expect(buttonContainer).toHaveStyle('border-color: #59b841');

  });

  test('selecting the correct answer disables all options', () => {
    render(<QuizPage />, { wrapper: MemoryRouter });

    const answerButtons = screen.getAllByRole('button', { name: /\d/ });
    fireEvent.click(answerButtons[0]);

    answerButtons.forEach((btn) => expect(btn).toBeDisabled());
  });

  test('selecting an incorrect answer disables all options', () => {
    render(<QuizPage />, { wrapper: MemoryRouter });

    const answerButtons = screen.getAllByRole('button', { name: /\d/ });
    fireEvent.click(answerButtons[0]);

    answerButtons.forEach((btn) => expect(btn).toBeDisabled());
  });

  test('selecting an incorrect answer updates the UI but does not increase points', () => {
    render(<QuizPage />, { wrapper: MemoryRouter });

    const incorrectAnswerButton = screen.getByRole('button', { name: "5" });
    // eslint-disable-next-line testing-library/no-node-access
    const buttonContainer = incorrectAnswerButton.closest('.btnContainer');
    fireEvent.click(incorrectAnswerButton);


    expect(screen.getByText('Points: 0/2')).toBeInTheDocument();
    expect(buttonContainer).toHaveStyle('background-color: #a7a3a3');
    expect(buttonContainer).toHaveStyle('border-color: red');
  });

  test('clicking next question button shows the next question', () => {
    render(<QuizPage />, { wrapper: MemoryRouter });

    const correctAnswerButton = screen.getByRole('button', { name: "20" });
    fireEvent.click(correctAnswerButton);

    const nextButton = screen.getByText('Next Question');
    fireEvent.click(nextButton);

    expect(screen.getByText('Question: 2/2')).toBeInTheDocument();
    expect(screen.getByText('What is the capital of France?')).toBeInTheDocument();
  });

  test('shows "See results" button after the last question is answered', () => {
    render(<QuizPage />, { wrapper: MemoryRouter });

    // Answer first question
    const correctAnswerButton = screen.getByRole('button', { name: /20/ });
    fireEvent.click(correctAnswerButton);
    fireEvent.click(screen.getByText('Next Question'));

    // Answer second question
    fireEvent.click(screen.getByText('Paris'));

    expect(screen.getByText('See results')).toBeInTheDocument();
  });

  test('navigates to results page after clicking "See results"', () => {
    render(<QuizPage />, { wrapper: MemoryRouter });

    // Answer first question
    const correctAnswerButton = screen.getByRole('button', { name: /20/ });
    fireEvent.click(correctAnswerButton);
    fireEvent.click(screen.getByText('Next Question'));

    // Answer second question
    fireEvent.click(screen.getByText('Paris'));
    fireEvent.click(screen.getByText('See results'));

    expect(mockNavigate).toHaveBeenCalledWith('/results', {
      state: { quizQuestions: mockQuizQuestions, selectedAnswers: ['20', 'Paris'], points: 2 },
    });
  });
});
