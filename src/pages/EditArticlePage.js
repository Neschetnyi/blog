import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArticleForm } from "../components/ArticleForm/ArticleForm"; // Импортируем форму

const EditArticlePage = () => {
  const navigate = useNavigate();
  const [articleData, setArticleData] = useState(null);

  useEffect(() => {
    // Здесь можно загрузить данные статьи для редактирования (например, через API)
    setArticleData({
      title: "Sample Article",
      description: "This is a sample article description.",
      text: "Here is the article text.",
      tags: ["Tag1", "Tag2"], // Предположим, что у нас есть существующие теги
    });
  }, []);

  const handleEditArticle = (formData) => {
    console.log("Editing article:", formData);
    // Здесь можно отправить обновленные данные на сервер
    navigate("/somewhere"); // Перенаправляем после успешного редактирования
  };

  if (!articleData) {
    return <div>Loading...</div>; // Заглушка, пока загружается статья
  }

  return (
    <div>
      <h2>Edit Article</h2>
      <ArticleForm
        existingArticle={articleData} // Передаем статью для редактирования
        existingTags={articleData.tags} // Передаем теги для редактирования
        onSubmit={handleEditArticle}
      />
    </div>
  );
};

export { EditArticlePage };
