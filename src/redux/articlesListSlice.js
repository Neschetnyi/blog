import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  articles: [],
  error: "",
  id: "",
  perPage: 4,
  pageNumber: 1,
  totalPages: null,
};

export const fetchArticles = createAsyncThunk(
  "articles/fetchArticles",
  (_, { getState, rejectWithValue }) => {
    const { perPage, pageNumber } = getState().articlesList;
    const offset = (pageNumber - 1) * perPage;
    const params = new URLSearchParams({
      limit: perPage,
      offset: offset,
    });

    const url = `https://blog-platform.kata.academy/api/articles?${params.toString()}`;

    return axios
      .get(`${url}`)
      .then((response) => {
        console.log(response);

        return response.data;
      })
      .catch((error) => {
        return rejectWithValue(error.message);
      });
  }
);

const articlesListSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    change_page: (state, action) => {
      state.pageNumber = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchArticles.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchArticles.fulfilled, (state, action) => {
      state.loading = false;
      state.articles = action.payload.articles;
      state.totalPages =
        action.payload.articlesCount % state.perPage === 0
          ? action.payload.articlesCount / state.perPage
          : Math.trunc(action.payload.articlesCount / state.perPage) + 1;
    });
    builder.addCase(fetchArticles.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default articlesListSlice.reducer;
export const { change_page } = articlesListSlice.actions;
