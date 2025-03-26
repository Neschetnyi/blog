import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: true,
  article: {},
  error: "",
};

export const fetchArticle = createAsyncThunk(
  "article/fetchArticle",
  (slug, { rejectWithValue }) => {
    const url = `https://blog-platform.kata.academy/api/articles/${slug}`;

    return axios
      .get(`${url}`)
      .then((response) => {
        console.log("article when fetching", response.data.article);

        return response.data.article;
      })
      .catch((error) => {
        return rejectWithValue(error.message);
      });
  }
);

const SingleArticleSlice = createSlice({
  name: "article",
  initialState,

  extraReducers: (builder) => {
    builder.addCase(fetchArticle.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchArticle.fulfilled, (state, action) => {
      state.loading = false;
      state.article = action.payload;
    });
    builder.addCase(fetchArticle.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default SingleArticleSlice.reducer;
