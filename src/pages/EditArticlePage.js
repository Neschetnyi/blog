import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ArticleForm } from "../components/ArticleForm/ArticleForm";
import style from "./ArticleForm.module.scss";
import { updateArticle, fetchArticle } from "../redux/SingleArticleSlice";
import { fetchArticles } from "../redux/articlesListSlice";

const EditArticlePage = () => {
  const location = useLocation();
  const { slug } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const articleData = useSelector((state) => state.article.article);
  const loading = useSelector((state) => state.article.loading);

  const [formData, setFormData] = useState(() => {
    const savedArticle = localStorage.getItem(`article-${slug}`);
    return savedArticle
      ? JSON.parse(savedArticle)
      : { title: "", description: "", body: "", tagList: [] };
  });

  useEffect(() => {
    if (!articleData) {
      const savedArticle = localStorage.getItem(`article-${slug}`);
      if (savedArticle) {
        dispatch({
          type: "article/setArticle",
          payload: JSON.parse(savedArticle),
        });
      } else {
        dispatch(fetchArticle(slug));
      }
    }

    if (articleData && articleData.author?.username) {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user || user.username !== articleData.author.username) {
        navigate("/");
      }
    }
  }, [slug, articleData, dispatch, navigate]);

  useEffect(() => {
    if (articleData && articleData.title) {
      setFormData({
        title: articleData.title || "",
        description: articleData.description || "",
        body: articleData.body || "",
        tagList: articleData.tagList || [],
      });
      localStorage.setItem(`article-${slug}`, JSON.stringify(articleData));
    }
  }, [articleData, slug]);

  if (loading) return <div>Loading article...</div>;

  if (!articleData) return <div>Article not found.</div>;

  const handleEditArticle = (updatedData) => {
    let user = JSON.parse(localStorage.getItem("user"));
    updatedData.token = user.token;
    updatedData.slug = articleData.slug;
    dispatch(updateArticle(updatedData)).then(() =>
      dispatch(fetchArticles(updatedData.token))
    );
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
