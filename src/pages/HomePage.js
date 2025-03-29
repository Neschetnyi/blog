import "../App.scss";
import ArticlesList from "../components/ArticlesList/ArticlesList";
import { Pagination } from "antd";
import { change_page, fetchArticles } from "../redux/articlesListSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

function HomePage() {
  const dispatch = useDispatch();
  const current = useSelector((store) => store.articlesList.pageNumber);
  const total = useSelector((store) => store.articlesList.totalPages);

  useEffect(() => {
    dispatch(fetchArticles(localStorage.getItem("token"))); // Загружаем статьи при монтировании
  }, [dispatch]);

  const handleChange = (page) => {
    dispatch(change_page(page));
    dispatch(fetchArticles(localStorage.getItem("token"))); // Обновляем статьи при смене страницы
  };

  return (
    <div className="article-container">
      <ArticlesList />
      <Pagination
        size="small"
        defaultCurrent={1}
        current={current}
        total={total * 10}
        className="pagination"
        onChange={handleChange}
        showSizeChanger={false}
      />
    </div>
  );
}

export default HomePage;
