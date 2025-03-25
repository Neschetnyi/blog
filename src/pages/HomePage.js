import "../App.scss";
import ArticlesList from "../components/ArticlesList/ArticlesList";
import { Pagination } from "antd";
import { change_page } from "../redux/articlesListSlice";
import { useDispatch, useSelector } from "react-redux";

function HomePage() {
  const current = useSelector((store) => store.articlesList.pageNumber);
  const total = useSelector((store) => store.articlesList.totalPages);

  const dispatch = useDispatch();
  const handleChange = (page) => {
    dispatch(change_page(page));
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
