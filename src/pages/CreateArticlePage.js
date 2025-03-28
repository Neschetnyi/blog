import React from "react";
import { useNavigate } from "react-router-dom";
import { ArticleForm } from "../components/ArticleForm/ArticleForm"; // Импортируем форму

const CreateArticlePage = () => {
  const navigate = useNavigate();

  const handleCreateArticle = (formData) => {
    console.log("Creating article:", formData);
    // Здесь можно отправить данные на сервер или сохранить в store
    navigate("/"); // Перенаправляем после успешного создания
  };

  return (
    <div>
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
