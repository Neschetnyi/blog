import { fetchArticles } from "../../redux/articlesListSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ArticleCard from "./ArticleCard/ArticleCard";
import style from "./ArticlesList.scss";

const ArticlesList = () => {
  const dispatch = useDispatch();
  const loading = useSelector((store) => store.articlesList.loading);
  const articles = useSelector((store) => store.articlesList.articles);
  const page = useSelector((store) => store.articlesList.pageNumber);
  const username = useSelector((store) => store.user.username);

  useEffect(() => {
    dispatch(fetchArticles());
  }, [page, username]);
  return (
    <div>
      {loading ? (
        <div className={style.loading}>Loading...</div>
      ) : articles ? (
        articles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))
      ) : null}
    </div>
  );
};

export default ArticlesList;
