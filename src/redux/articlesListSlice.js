import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const savedPage = localStorage.getItem("pageNumber");

const initialState = {
  loading: false,
  articles: [],
  error: "",
  perPage: 4,
  pageNumber: savedPage ? Number(savedPage) : 1,
  totalPages: null,
};

export const fetchArticles = createAsyncThunk(
  "articles/fetchArticles",
  async (token, { getState, rejectWithValue }) => {
    const { perPage, pageNumber } = getState().articlesList;
    const offset = (pageNumber - 1) * perPage;
    const params = new URLSearchParams({ limit: perPage, offset });

    try {
      const response = await axios.get(
        `https://blog-platform.kata.academy/api/articles?${params.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const articlesListSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    change_page: (state, action) => {
      state.pageNumber = action.payload;
      localStorage.setItem("pageNumber", action.payload);
    },
    updateArticleLikes: (state, action) => {
      const { slug, favorited, favoritesCount } = action.payload;
      const article = state.articles.find((a) => a.slug === slug);
      if (article) {
        article.favorited = favorited;
        article.favoritesCount = favoritesCount;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.loading = false;
        state.articles = action.payload.articles;
        state.totalPages = Math.ceil(
          action.payload.articlesCount / state.perPage
        );
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default articlesListSlice.reducer;
export const { change_page, updateArticleLikes } = articlesListSlice.actions;
