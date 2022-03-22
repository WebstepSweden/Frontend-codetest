import { Route, Routes } from "react-router-dom";
import "./App.css";
import { QuizFormPage } from "./features/quiz-form-page/QuizFormPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route index element={<QuizFormPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
