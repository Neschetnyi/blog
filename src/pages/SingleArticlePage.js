import { useParams, useNavigate } from "react-router-dom";
import { fetchArticle } from "../redux/SingleArticleSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import style from "./SingleArticle.module.scss";
import { HeartOutlined } from "@ant-design/icons";
import { Rate } from "antd";
import { Tag } from "antd";
import { Avatar } from "antd";

const SingleArticle = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Хук для навигации
  const articleData = useSelector((store) => store.article);
  const loading = useSelector((store) => store.article.loading);

  useEffect(() => {
    dispatch(fetchArticle(slug));
  }, [slug, dispatch]);

  console.log("articleData is", articleData);

  const {
    body,
    author,
    createdAt,
    description,
    favoritesCount,
    tagList,
    title,
    favorited,
  } = articleData.article;
  const markdown = body;
  const creationDate = new Date(createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  console.log("article body is", body);
  console.log("article tagList is", tagList);

  const handleEditClick = () => {
    // Переход на страницу редактирования
    navigate(`/articles/${slug}/edit`, {
      state: { articleData }, // Передаем данные статьи через state
    });
  };

  return loading ? (
    "Loading..."
  ) : (
    <div className={style.container}>
      <div className={style.top_container}>
        <div className={style.title_container}>
          <div className={style.title}>
            {title}

            <Rate
              count={1}
              character={<HeartOutlined />}
              disabled={!localStorage.getItem("user")}
            />
            <span className={style.favoritesCount}>{favoritesCount}</span>
          </div>
          <div className={style.tag_container}>
            {tagList && tagList.length > 0
              ? tagList.map((tag, index) => (
                  <Tag key={`${index}${tag}`}>{tag}</Tag>
                ))
              : null}
          </div>
        </div>
        <div className={style.author_container}>
          <div className={style.author_data_container}>
            <div className={style.autor_name}>{author.username}</div>
            <div className={style.date}>{creationDate}</div>
          </div>
          <Avatar src={author.image} size={"large"} />
        </div>
      </div>
      <div className={style.text_container}>
        <div className={style.description_container}>
          <div className={style.description}>{description}</div>
          {localStorage.getItem("user") ? (
            <div className={style.button_container}>
              <button className={`${style.button} ${style.delete}`}>
                Delete
              </button>
              <button
                className={`${style.button} ${style.edit}`}
                onClick={handleEditClick} // Обработчик клика
              >
                Edit
              </button>
            </div>
          ) : null}
        </div>

        <ReactMarkdown>{markdown}</ReactMarkdown>
      </div>
    </div>
  );
};

export { SingleArticle };
