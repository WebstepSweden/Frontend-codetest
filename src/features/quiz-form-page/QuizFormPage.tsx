import { useEffect, useState } from "react";
import { createQuiz } from "../../common/requests/quizRequest";
import {
  Category,
  fetchCategories,
} from "../../common/requests/categoriesRequest";
import { Spinner } from "../../common/components/Spinner";
import { QuizForm } from "./QuizForm";
import { useNavigate } from "react-router-dom";
import { decodeQuizQuestions } from "../../common/requests/utils/decodeQuizQuestions";

export const QuizFormPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories().then((categoryResponse) => {
      setCategories(categoryResponse);
      setIsLoading(false);
    });
  }, []);

  const onSubmitQuiz = async (amount: number,
    difficulty: string | undefined,
    category: Category | undefined) => {
    const encodedQuizQuestions = await createQuiz(amount, difficulty, category);

    const decodedQuizQuestions = decodeQuizQuestions(encodedQuizQuestions.results);
    navigate("/quiz", { state: { quizQuestions: decodedQuizQuestions } });
  };


  return (
    <div>
      <h1>Quiz form</h1>
      {isLoading ? (
        <Spinner />
      ) : (
        <QuizForm categories={categories} submit={onSubmitQuiz} />
      )}
    </div>
  );
};
