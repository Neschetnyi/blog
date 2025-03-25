import style from "./Header.module.scss";

const Header = () => {
  return (
    <header className={style.header}>
      <div>Realworld Blog</div>
      <div>
        <button className={`${style.button} ${style.SignIn}`}>Sign In</button>
        <button className={`${style.button} ${style.SignUp}`}>Sign Up</button>
      </div>
    </header>
  );
};

export default Header;
