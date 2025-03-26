import { Link, useMatch } from "react-router-dom";
import style from "./CustomLink.module.scss";

const CustomLink = ({ children, to, ...props }) => {
  const match = useMatch(to);
  return (
    <Link to={to} {...props} className={match ? style.active : style.active}>
      {children}
    </Link>
  );
};

export { CustomLink };
