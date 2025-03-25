import style from "./ArticleCard.module.scss";
import ReactMarkdown from "react-markdown";
import { HeartOutlined } from "@ant-design/icons";
import { Rate } from "antd";
import { Tag } from "antd";
import { Avatar } from "antd";

const ArticleCard = ({ article }) => {
  const creationDate = new Date(article.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const markdown = article.body;
  return (
    <div className={style.container}>
      <div className={style.top_container}>
        <div className={style.title_container}>
          <div className={style.title}>
            {article.title}
            <Rate count={1} character={<HeartOutlined />} disabled />
            <span className={style.favoritesCount}>
              {article.favoritesCount}
            </span>
          </div>
          <div className={style.tag_container}>
            {article.tagList.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
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
        <ReactMarkdown>{markdown}</ReactMarkdown>
      </div>
    </div>
  );
};

export default ArticleCard;
