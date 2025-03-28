import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArticleForm } from "../components/ArticleForm/ArticleForm"; // Импортируем форму
import style from "./ArticleForm.module.scss";
import { useDispatch } from "react-redux";
import { updateArticle } from "../redux/SingleArticleSlice";
import { fetchArticles } from "../redux/articlesListSlice";

const EditArticlePage = () => {
  const location = useLocation();
  const { articleData } = location.state || {}; // Извлекаем данные из state
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log("articleData in EditArticalPage");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    body: "",
    tagList: [],
  });

  useEffect(() => {
    if (articleData) {
      // Если данные статьи существуют, обновляем состояние
      setFormData({
        title: articleData.article.title || "",
        description: articleData.article.description || "",
        body: articleData.article.body || "",
        tagList: articleData.article.tagList || [],
      });
    }
  }, [articleData]);

  console.log("articleData in EditPage", articleData);

  if (!articleData) {
    return <div>Article data is not available.</div>;
  }

  // Функция для обработки отправки данных
  const handleEditArticle = (updatedData) => {
    let user = JSON.parse(localStorage.getItem("user"));
    updatedData.token = user.token;
    updatedData.slug = articleData.article.slug;
    console.log("Updated article data:", updatedData);
    dispatch(updateArticle(updatedData)).then(() => dispatch(fetchArticles()));
    navigate("/");
  };

  return (
    <div className={style.container}>
      <h2>Edit Article</h2>
      {/* Передаем данные статьи в компонент формы */}
      <ArticleForm
        existingArticle={formData} // Передаем данные из состояния
        existingTags={formData.tagList} // Теги из состояния
        onSubmit={handleEditArticle} // Обработчик отправки данных
      />
    </div>
  );
};

export { EditArticlePage };
