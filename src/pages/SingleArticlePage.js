import { useParams, useNavigate } from "react-router-dom";
import { deleteArticle, fetchArticle } from "../redux/SingleArticleSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import style from "./SingleArticle.module.scss";
import { HeartOutlined } from "@ant-design/icons";
import { Rate, Tag, Avatar, Modal } from "antd";
import { fetchArticles } from "../redux/articlesListSlice";

const SingleArticle = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const articleData = useSelector((store) => store.article);
  const loading = useSelector((store) => store.article.loading);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    dispatch(fetchArticle(slug));
  }, []);

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

  const handleEditClick = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.username === author?.username) {
      navigate(`/articles/${slug}/edit`, { state: { articleData } });
    } else {
      alert("forbidden");
    }
  };

  const showDeleteModal = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.username === author?.username) {
      setIsModalVisible(true);
    } else {
      alert("forbidden");
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleDeleteConfirm = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.username === author?.username) {
      const token = user.token;
      const data = { token, slug };
      dispatch(deleteArticle(data)).then(() => dispatch(fetchArticles()));
      navigate("/");
    }
    setIsModalVisible(false);
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
            {tagList?.length > 0 &&
              tagList.map((tag, index) => (
                <Tag key={`${index}${tag}`}>{tag}</Tag>
              ))}
          </div>
        </div>
        <div className={style.author_container}>
          <div className={style.author_data_container}>
            <div className={style.autor_name}>{author?.username}</div>
            <div className={style.date}>{creationDate}</div>
          </div>
          <Avatar src={author?.image} size={"large"} />
        </div>
      </div>
      <div className={style.text_container}>
        <div className={style.description_container}>
          <div className={style.description}>{description}</div>
          {localStorage.getItem("user") && (
            <div className={style.button_container}>
              <button
                className={`${style.button} ${style.delete}`}
                onClick={showDeleteModal}
              >
                Delete
              </button>
              <button
                className={`${style.button} ${style.edit}`}
                onClick={handleEditClick}
              >
                Edit
              </button>
            </div>
          )}
        </div>
        <ReactMarkdown>{markdown}</ReactMarkdown>
      </div>

      <Modal
        title="Confirm Deletion"
        open={isModalVisible}
        onOk={handleDeleteConfirm}
        onCancel={handleCancel}
        okText="Yes"
        cancelText="No"
      >
        <p>Are you sure you want to delete this article?</p>
      </Modal>
    </div>
  );
};

export { SingleArticle };
