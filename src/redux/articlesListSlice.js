import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const savedPage = localStorage.getItem("pageNumber");

const initialState = {
  loading: false,
  articles: [],
  error: "",
  id: "",
  perPage: 4,
  pageNumber: savedPage ? Number(savedPage) : 1, // Загружаем страницу из localStorage
  totalPages: null,
};

export const fetchArticles = createAsyncThunk(
  "articles/fetchArticles",
  (token, { getState, rejectWithValue }) => {
    const { perPage, pageNumber } = getState().articlesList;
    const offset = (pageNumber - 1) * perPage;
    const params = new URLSearchParams({
      limit: perPage,
      offset: offset,
    });

    const url = `https://blog-platform.kata.academy/api/articles?${params.toString()}`;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    return axios
      .get(url, config)
      .then((response) => response.data)
      .catch((error) => rejectWithValue(error.message));
  }
);

const articlesListSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    change_page: (state, action) => {
      state.pageNumber = action.payload;
      localStorage.setItem("pageNumber", action.payload); // Сохраняем в localStorage
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
export const { change_page } = articlesListSlice.actions;
