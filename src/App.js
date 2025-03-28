import "./App.scss";

import Layout from "./components/Layout/Layout";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import { Routes, Route } from "react-router-dom";
import { SingleArticle } from "./pages/SingleArticlePage";
import { SignUpPage } from "./pages/SignUpPage";
import { SignInPage } from "./pages/SignInPage";
import { EditUserPage } from "./pages/EditUserPage";
import { RequireAuth } from "./hoc/RequireAuth";
import { CreateArticlePage } from "./pages/CreateArticlePage";
import { EditArticlePage } from "./pages/EditArticlePage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/articles" element={<HomePage />} />
          <Route path="/articles/:slug" element={<SingleArticle />} />
          <Route path="/signUp" element={<SignUpPage />} />
          <Route path="/signIn" element={<SignInPage />} />
          <Route path="/profile" element={<EditUserPage />} />
          <Route
            path="/new-article"
            element={
              <RequireAuth>
                <CreateArticlePage />
              </RequireAuth>
            }
          />
          <Route
            path="/articles/:slug/edit"
            element={
              <RequireAuth>
                <EditArticlePage />
              </RequireAuth>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
