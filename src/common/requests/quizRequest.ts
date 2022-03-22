import { Category } from "./categoriesRequest";

interface ApiQuizResponse {
  responseCode: number;
  results: Array<{
    category: string;
    type: string;
    difficulty: string;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
  }>;
}

export const createQuiz = async (
  amount: number,
  difficulty: string | undefined,
  category: Category | undefined
) => {
  let url = `https://opentdb.com/api.php?amount=${amount}`;
  if (difficulty) {
    url += `&difficulty=${difficulty.toLocaleLowerCase()}`;
  }
  if (category) {
    url += `&category=${category.id}`;
  }
  const response = await fetch(url);
  const responseJson: ApiQuizResponse = await response.json();
  if (responseJson.responseCode > 0) {
    throw new Error("Invalid request");
  }

  return Promise.resolve(responseJson);
};
