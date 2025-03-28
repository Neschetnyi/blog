import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArticleForm } from "../components/ArticleForm/ArticleForm"; // Импортируем форму
import style from "./ArticleForm.module.scss";

const EditArticlePage = () => {
  const location = useLocation();
  const { articleData } = location.state || {}; // Извлекаем данные из state

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
    console.log("Updated article data:", updatedData);
    // Здесь можно отправить данные на сервер, например, с помощью dispatch
    // dispatch(updateArticle(updatedData));
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
