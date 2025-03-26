import "./App.scss";

import Layout from "./components/Layout/Layout";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import { Routes, Route } from "react-router-dom";
import { SingleArticle } from "./pages/SingleArticlePage";
import { SignUpPage } from "./pages/SignUpPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/articles" element={<HomePage />} />
          <Route path="/articles/:slug" element={<SingleArticle />} />
          <Route path="/signUp" element={<SignUpPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
