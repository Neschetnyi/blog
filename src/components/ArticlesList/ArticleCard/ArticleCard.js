import style from "./ArticleCard.module.scss";
import ReactMarkdown from "react-markdown";
import { HeartOutlined } from "@ant-design/icons";
import { Rate, Tag, Avatar } from "antd";
import { CustomLink } from "../../CustomLink/CustomLink";
import { useDispatch } from "react-redux";
import {
  favoriteArticle,
  unfavoriteArticle,
} from "../../../redux/SingleArticleSlice";
import { updateArticleLikes } from "../../../redux/articlesListSlice";

const ArticleCard = ({ article }) => {
  const dispatch = useDispatch();
  const creationDate = new Date(article.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleFavorite = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return;

    const data = {
      token: user.token,
      slug: article.slug,
    };

    if (article.favorited) {
      dispatch(unfavoriteArticle(data)).then((response) => {
        if (response.payload) {
          dispatch(
            updateArticleLikes({
              slug: article.slug,
              favorited: false,
              favoritesCount: article.favoritesCount - 1,
            })
          );
        }
      });
    } else {
      dispatch(favoriteArticle(data)).then((response) => {
        if (response.payload) {
          dispatch(
            updateArticleLikes({
              slug: article.slug,
              favorited: true,
              favoritesCount: article.favoritesCount + 1,
            })
          );
        }
      });
    }
  };

  return (
    <div className={style.container}>
      <div className={style.top_container}>
        <div className={style.title_container}>
          <div className={style.title}>
            <CustomLink to={`/articles/${article.slug}`}>
              {article.title}
            </CustomLink>
            <Rate
              count={1}
              character={<HeartOutlined />}
              disabled={!localStorage.getItem("user")}
              value={article.favorited ? 1 : 0}
              onClick={handleFavorite}
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
            <div className={style.autor_name}>{article.author.username}</div>
            <div className={style.date}>{creationDate}</div>
          </div>
          <Avatar src={article.author.image} size={"large"} />
        </div>
      </div>
      <div className={style.text_container}>
        <ReactMarkdown>{article.description}</ReactMarkdown>
      </div>
    </div>
  );
};

export default ArticleCard;
