export interface Category {
  id: string;
  name: string;
}
interface Categories {
  trivia_categories: Category[];
}

export const fetchCategories = async () => {
  const response = await fetch("https://opentdb.com/api_category.php");
  const responseJson: Categories = await response.json();
  return Promise.resolve(responseJson.trivia_categories);
};
