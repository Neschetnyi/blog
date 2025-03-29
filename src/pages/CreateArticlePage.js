import React from "react";
import { useNavigate } from "react-router-dom";
import { ArticleForm } from "../components/ArticleForm/ArticleForm";
import style from "./ArticleForm.module.scss";
import { createArticle } from "../redux/SingleArticleSlice";
import { useDispatch } from "react-redux";
import { change_page, fetchArticles } from "../redux/articlesListSlice";

const CreateArticlePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCreateArticle = (formData) => {
    let user = JSON.parse(localStorage.getItem("user"));
    formData.token = user.token;
    console.log("Creating article formData:", formData);

    dispatch(createArticle(formData)).then(() =>
      dispatch(fetchArticles(formData.token))
    );
    localStorage.setItem("pageNumber", 1);
    dispatch(change_page(1));
    navigate("/");
  };

  return (
    <div className={style.container}>
      <h2>Create New Article</h2>
      <ArticleForm
        existingArticle={{}}
        existingTags={[]}
        onSubmit={handleCreateArticle}
      />
    </div>
  );
};

export { CreateArticlePage };
