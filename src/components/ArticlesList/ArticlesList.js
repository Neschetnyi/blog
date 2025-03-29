import { fetchArticles } from "../../redux/articlesListSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ArticleCard from "./ArticleCard/ArticleCard";
import style from "./ArticlesList.module.scss";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const ArticlesList = () => {
  const dispatch = useDispatch();
  const loading = useSelector((store) => store.articlesList.loading);
  const articles = useSelector((store) => store.articlesList.articles);
  const page = useSelector((store) => store.articlesList.pageNumber);
  const username = useSelector((store) => store.user.username);

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user"));
    let token = user ? user.token : "";

    dispatch(fetchArticles(token));
  }, [dispatch, page, username]);

  return (
    <div className={style.container}>
      {loading ? (
        <div className={style.loading_container}>
          <Spin indicator={<LoadingOutlined spin />} size="large" />
        </div>
      ) : articles ? (
        articles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))
      ) : null}
    </div>
  );
};

export default ArticlesList;
