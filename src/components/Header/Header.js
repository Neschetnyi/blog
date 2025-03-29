import { NavLink, useNavigate } from "react-router-dom";
import style from "./Header.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { Avatar } from "antd";
import { getUser, log_out } from "../../redux/userSlice";
import { useEffect } from "react";
import { change_page } from "../../redux/articlesListSlice";

const Header = () => {
  const navigate = useNavigate();

  const username = useSelector((store) => store.user.username);
  const image = useSelector((store) => store.user.image);

  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("user") !== null) {
      let user = JSON.parse(localStorage.getItem("user"));
      console.log("In localStorage token is", user);
      dispatch(getUser(user));
    }
  }, []);

  return (
    <header className={style.header}>
      <NavLink
        to="/articles"
        onClick={() => {
          localStorage.setItem("pageNumber", 1);
          dispatch(change_page(1));
        }}
      >
        Realworld Blog
      </NavLink>
      <div className={style.buttuns_container}>
        {username && username !== "" ? (
          <>
            <button
              className={`${style.button} ${style.createArticle}`}
              onClick={() => {
                console.log("Create Article");
                navigate("/new-article");
              }}
            >
              Create Article
            </button>
            <button
              className={`${style.button} ${style.profile}`}
              onClick={() => navigate("/profile")}
            >
              <div>{username}</div>
              <Avatar
                src={image}
                size={"large"}
                className={style.avatar}
              />{" "}
            </button>

            <button
              className={`${style.button} ${style.logout}`}
              onClick={() => {
                localStorage.clear();
                dispatch(log_out());
                navigate("/");
              }}
            >
              Log Out
            </button>
          </>
        ) : (
          <>
            <button
              className={`${style.button} ${style.SignIn}`}
              onClick={() => navigate("/signIn")}
            >
              Sign In
            </button>
            <button
              className={`${style.button} ${style.SignUp}`}
              onClick={() => navigate("/signUp")}
            >
              Sign Up
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
