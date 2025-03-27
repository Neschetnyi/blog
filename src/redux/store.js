import { configureStore } from "@reduxjs/toolkit";
import articlesListReducer from "./articlesListSlice";
import articleReducer from "./SingleArticleSlice";
import userReducer from "./userSlice";

const store = configureStore({
  reducer: {
    articlesList: articlesListReducer,
    article: articleReducer,
    user: userReducer,
  },
});

export default store;
