import { configureStore } from "@reduxjs/toolkit";
import articlesListReducer from "./articlesListSlice";
import articleReducer from "./SingleArticleSlice";

const store = configureStore({
  reducer: {
    articlesList: articlesListReducer,
    article: articleReducer,
  },
});

export default store;
