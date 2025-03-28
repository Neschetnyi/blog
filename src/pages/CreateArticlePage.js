import React from "react";
import { useNavigate } from "react-router-dom";
import { ArticleForm } from "../components/ArticleForm/ArticleForm"; // Импортируем форму
import style from "./ArticleForm.module.scss";
import { createArticle } from "../redux/SingleArticleSlice";
import { useDispatch } from "react-redux";
import { fetchArticles } from "../redux/articlesListSlice";

const CreateArticlePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCreateArticle = (formData) => {
    let user = JSON.parse(localStorage.getItem("user"));
    formData.token = user.token;
    console.log("Creating article formData:", formData);

    dispatch(createArticle(formData)).then(() => dispatch(fetchArticles()));
    navigate("/"); // Перенаправляем после успешного создания
  };

  return (
    <div className={style.container}>
      <h2>Create New Article</h2>
      <ArticleForm
        existingArticle={{}} // Передаем пустые данные для создания новой статьи
        existingTags={[]} // Передаем пустой массив для тегов
        onSubmit={handleCreateArticle} // Функция для обработки отправки данных
      />
    </div>
  );
};

export { CreateArticlePage };
