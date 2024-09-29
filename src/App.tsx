import { Route, Routes } from "react-router-dom";
import "./App.css";
import { QuizFormPage } from "./features/quiz-form-page/QuizFormPage";
import { QuizPage } from "./features/quiz-page/QuizPage";
import { QuizResultsPage } from "./features/quiz-results-page/QuizResultsPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route index element={<QuizFormPage />}></Route>
        <Route path="/quiz" element={<QuizPage />}></Route>
        <Route path="/results" element={<QuizResultsPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
