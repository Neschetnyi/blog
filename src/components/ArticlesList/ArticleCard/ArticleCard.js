import style from "./ArticleCard.module.scss";
import ReactMarkdown from "react-markdown";
import { HeartOutlined } from "@ant-design/icons";
import { Rate } from "antd";
import { Tag } from "antd";
import { Avatar } from "antd";
import { CustomLink } from "../../CustomLink/CustomLink";

const ArticleCard = ({ article }) => {
  const creationDate = new Date(article.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const markdown = article.description;

  const handleClick = () => {
    console.log(article);
  };

  return (
    <div className={style.container}>
      <div className={style.top_container}>
        <div className={style.title_container}>
          <div className={style.title}>
            <CustomLink to={`/articles/${article.slug}`} onClick={handleClick}>
              {" "}
              {article.title}
            </CustomLink>

            <Rate
              count={1}
              character={<HeartOutlined />}
              disabled={!localStorage.getItem("user")}
            />
            <span className={style.favoritesCount}>
              {article.favoritesCount}
            </span>
          </div>
          <div className={style.tag_container}>
            {article.tagList.length > 0 && article.tagList
              ? article.tagList.map((tag, index) => (
                  <Tag key={`${index}${tag}`}>{tag}</Tag>
                ))
              : null}
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
        <ReactMarkdown>{markdown}</ReactMarkdown>
      </div>
    </div>
  );
};

export default ArticleCard;
