import { useParams, useNavigate } from "react-router-dom";
import {
  deleteArticle,
  favoriteArticle,
  fetchArticle,
  unfavoriteArticle,
} from "../redux/SingleArticleSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import style from "./SingleArticle.module.scss";
import { HeartOutlined } from "@ant-design/icons";
import { Rate, Tag, Avatar, Modal, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const SingleArticle = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const articleData = useSelector((store) => store.article);
  const loading = useSelector((store) => store.article.loading);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [article, setArticle] = useState(null);

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user"));
    let token = user ? user.token : "";
    let data = { token, slug };

    dispatch(fetchArticle(data)).then((response) => {
      if (response.payload) {
        setArticle(response.payload);
      }
    });
  }, [dispatch, slug]);

  const handleFavorite = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return;

    const data = {
      token: user.token,
      slug: slug,
    };

    if (article.favorited) {
      dispatch(unfavoriteArticle(data)).then((response) => {
        if (response.payload) {
          setArticle((prev) => ({
            ...prev,
            favorited: false,
            favoritesCount: prev.favoritesCount - 1,
          }));
        }
      });
    } else {
      dispatch(favoriteArticle(data)).then((response) => {
        if (response.payload) {
          setArticle((prev) => ({
            ...prev,
            favorited: true,
            favoritesCount: prev.favoritesCount + 1,
          }));
        }
      });
    }
  };

  const handleEditClick = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.username === article?.author?.username) {
      navigate(`/articles/${slug}/edit`, { state: { articleData } });
    }
  };

  const showDeleteModal = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.username === article?.author?.username) {
      setIsModalVisible(true);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleDeleteConfirm = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.username === article?.author?.username) {
      const token = user.token;
      const data = { token, slug };
      dispatch(deleteArticle(data)).then(() => {
        navigate("/");
      });
    }
    setIsModalVisible(false);
  };

  if (loading || !article) {
    return (
      <div className={style.loading_container}>
        <Spin indicator={<LoadingOutlined spin />} size="large" />
      </div>
    );
  }

  const user = JSON.parse(localStorage.getItem("user"));
  const isAuthor = user?.username === article.author?.username;
  const creationDate = new Date(article.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className={style.container}>
      <div className={style.top_container}>
        <div className={style.title_container}>
          <div className={style.title}>
            {article.title}
            <Rate
              count={1}
              character={<HeartOutlined />}
              disabled={!user}
              onClick={handleFavorite}
              value={article.favorited ? 1 : 0}
            />
            <span className={style.favoritesCount}>
              {article.favoritesCount}
            </span>
          </div>
          <div className={style.tag_container}>
            {article.tagList.map((tag, index) => (
              <Tag key={`${index}${tag}`}>{tag}</Tag>
            ))}
          </div>
        </div>
        <div className={style.author_container}>
          <div className={style.author_data_container}>
            <div className={style.autor_name}>{article.author?.username}</div>
            <div className={style.date}>{creationDate}</div>
          </div>
          <Avatar src={article.author?.image} size={"large"} />
        </div>
      </div>
      <div className={style.text_container}>
        <div className={style.description_container}>
          <div className={style.description}>{article.description}</div>
          {isAuthor && (
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
        <ReactMarkdown>{article.body}</ReactMarkdown>
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
