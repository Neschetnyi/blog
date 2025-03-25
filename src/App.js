import "./App.scss";
import ArticlesList from "./components/ArticlesList/ArticlesList";
import Header from "./components/Header/Header";
import { Pagination } from "antd";
import { change_page } from "./redux/articlesListSlice";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const current = useSelector((store) => store.articlesList.pageNumber);
  const total = useSelector((store) => store.articlesList.totalPages);

  const dispatch = useDispatch();
  const handleChange = (page) => {
    dispatch(change_page(page));
  };
  return (
    <div className="App">
      <Header />
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
    </div>
  );
}

export default App;
