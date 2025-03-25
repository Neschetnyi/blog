import { configureStore } from "@reduxjs/toolkit";
import articlesListReducer from "./articlesListSlice";

const store = configureStore({
  reducer: {
    articlesList: articlesListReducer,
  },
});

export default store;
