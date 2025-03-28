import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ArticleForm } from "../components/ArticleForm/ArticleForm";
import style from "./ArticleForm.module.scss";
import { updateArticle, fetchArticle } from "../redux/SingleArticleSlice";
import { fetchArticles } from "../redux/articlesListSlice";

const EditArticlePage = () => {
  const location = useLocation();
  const { slug } = useParams(); // Получаем slug из URL
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const articleData = useSelector((state) => state.article.article); // Данные статьи из Redux
  const loading = useSelector((state) => state.article.loading);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    body: "",
    tagList: [],
  });

  useEffect(() => {
    if (!location.state?.articleData) {
      dispatch(fetchArticle(slug)); // Загружаем статью, если её нет в `state`
    }
  }, [slug, location.state, dispatch]);

  useEffect(() => {
    if (articleData) {
      setFormData({
        title: articleData.title || "",
        description: articleData.description || "",
        body: articleData.body || "",
        tagList: articleData.tagList || [],
      });
    }
  }, [articleData]);

  if (loading) return <div>Loading...</div>;
  if (!articleData) return <div>Article data is not available.</div>;

  const handleEditArticle = (updatedData) => {
    let user = JSON.parse(localStorage.getItem("user"));
    updatedData.token = user.token;
    updatedData.slug = articleData.slug;
    dispatch(updateArticle(updatedData)).then(() => dispatch(fetchArticles()));
    navigate("/");
  };

  return (
    <div className={style.container}>
      <h2>Edit Article</h2>
      <ArticleForm
        existingArticle={formData}
        existingTags={formData.tagList}
        onSubmit={handleEditArticle}
      />
    </div>
  );
};

export { EditArticlePage };
