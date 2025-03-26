import { NavLink } from "react-router-dom";
import style from "./Header.module.scss";

const Header = () => {
  return (
    <header className={style.header}>
      <NavLink to="/articles">Realworld Blog</NavLink>
      <div>
        <button className={`${style.button} ${style.SignIn}`}>Sign In</button>
        <button className={`${style.button} ${style.SignUp}`}>Sign Up</button>
      </div>
    </header>
  );
};

export default Header;
