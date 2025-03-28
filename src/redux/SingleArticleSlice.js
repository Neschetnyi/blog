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

export const createArticle = createAsyncThunk(
  "article/createArticle",
  (data, { rejectWithValue }) => {
    const url = `https://blog-platform.kata.academy/api/articles`;

    const config = {
      headers: {
        Authorization: `Bearer ${data.token}`,
        "Content-Type": "application/json",
      },
    };

    const axiosData = {
      article: {
        title: data.title,
        description: data.description,
        body: data.text,
        tagList: data.tags,
      },
    };

    console.log("article/createArticle  axiosData", axiosData);
    return axios
      .post(url, axiosData, config)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log("createArticle Error:", error.response?.data);
        return rejectWithValue(error.response?.data);
      });
  }
);

export const updateArticle = createAsyncThunk(
  "article/updateArticle",
  (data, { rejectWithValue }) => {
    const url = `https://blog-platform.kata.academy/api/
/articles/${data.slug}`;

    const config = {
      headers: {
        Authorization: `Bearer ${data.token}`,
        "Content-Type": "application/json",
      },
    };

    const axiosData = {
      article: {
        title: data.title,
        description: data.description,
        body: data.text,
        tagList: data.tags,
        slug: data.slug,
      },
    };

    console.log("article/updateArticle  axiosData", axiosData);
    return axios
      .put(url, axiosData, config)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log("updateArticle Error:", error.response?.data);
        return rejectWithValue(error.response?.data);
      });
  }
);

export const deleteArticle = createAsyncThunk(
  "article/deleteArticle",
  (data, { rejectWithValue }) => {
    const url = `https://blog-platform.kata.academy/api/
/articles/${data.slug}`;

    const config = {
      headers: {
        Authorization: `Bearer ${data.token}`,
        "Content-Type": "application/json",
      },
    };

    console.log("article/deleteArticle  axiosData", config);
    return axios
      .delete(url, config)
      .then((response) => {
        console.log("article/deleteArticle  response", response);
        return response.data;
      })
      .catch((error) => {
        console.log("deleteArticle Error:", error.response?.data);
        return rejectWithValue(error.response?.data);
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
