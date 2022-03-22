import React, { useState, ChangeEvent } from "react";
import { Button } from "../../common/components/Button";
import { Dropdown } from "../../common/components/Dropdown";
import { Input } from "../../common/components/Input";
import { Category } from "../../common/requests/categoriesRequest";
import styles from "./QuizForm.module.css";

interface Props {
  categories: Category[];
  submit: (
    amount: number,
    difficulty: string | undefined,
    category: Category | undefined
  ) => void;
}

const difficultyOptions = ["Any difficulty", "Easy", "Medium", "Hard"];

export const QuizForm = ({ categories, submit }: Props) => {
  const [amount, setAmount] = useState(0);
  const [difficultyLevel, setDifficultyLevel] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category>();

  const onInputChange = (inputValue: number) => {
    setAmount(inputValue);
  };

  const onDropdownChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setDifficultyLevel(event.target.value);
  };

  const onCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedNameOfCategory = event.target.value;
    const newCategoryValue = categories.find(
      (category) => category.name === selectedNameOfCategory
    );
    setSelectedCategory(newCategoryValue);
  };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    submit(amount, difficultyLevel, selectedCategory);
  };

  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <Input label="Amount" onInputChange={onInputChange} />
      <Dropdown
        options={difficultyOptions}
        label="Difficulty level"
        onChange={onDropdownChange}
      />
      <Dropdown
        options={categories.map((category) => category.name)}
        label="Category"
        onChange={onCategoryChange}
      />
      <Button type="submit">Submit</Button>
    </form>
  );
};
