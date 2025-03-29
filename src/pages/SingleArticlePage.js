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
import { Rate, Tag, Avatar, Modal } from "antd";
import { fetchArticles } from "../redux/articlesListSlice";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const SingleArticle = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const articleData = useSelector((store) => store.article);
  const loading = useSelector((store) => store.article.loading);
  const [isModalVisible, setIsModalVisible] = useState(false);

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

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user"));

    let token = "";
    if (user) {
      token = user.token;
    }
    let data = {
      token: token,
      slug: slug,
    };
    dispatch(fetchArticle(data));
  }, [dispatch, slug]);

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
      dispatch(deleteArticle(data)).then(() => dispatch(fetchArticles(token)));
      navigate("/");
    }
    setIsModalVisible(false);
  };

  const handleFavorite = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    let data = {
      token: user ? user.token : "",
      slug: slug,
    };
    if (favorited) {
      dispatch(unfavoriteArticle(data)).then(() => {
        dispatch(fetchArticle(data));
      });
    } else if (user) {
      dispatch(favoriteArticle(data)).then(() => {
        dispatch(fetchArticle(data));
      });
    }
  };

  return loading ? (
    <div className={style.loading_container}>
      <Spin
        indicator={<LoadingOutlined spin />}
        size="large"
        className={style.loading_spinner}
      />
    </div>
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
              onClick={handleFavorite}
              value={favorited ? 1 : null}
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
