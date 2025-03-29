import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  article: {},
  error: "",
};

export const fetchArticle = createAsyncThunk(
  "article/fetchArticle",
  (data, { rejectWithValue }) => {
    console.log("data in single artical slise fetch", data);

    const url = `https://blog-platform.kata.academy/api/articles/${data.slug}`;

    const config = {
      headers: {
        Authorization: `Bearer ${data.token}`,
        "Content-Type": "application/json",
      },
    };

    return axios
      .get(url, config)
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

export const favoriteArticle = createAsyncThunk(
  "article/favoriteArticle",
  (data, { rejectWithValue }) => {
    const url = `https://blog-platform.kata.academy/api/articles/${data.slug}/favorite`;
    console.log("article/favoriteArticle data", data);

    const config = {
      headers: {
        Authorization: `Bearer ${data.token}`,
        "Content-Type": "application/json",
      },
    };

    return axios
      .post(url, {}, config)
      .then((response) => {
        console.log("article when favorite", response);
        return response.data;
      })
      .catch((error) => {
        console.log("article when favorite error", error.message);
        return rejectWithValue(error.response?.data || error.message);
      });
  }
);

export const unfavoriteArticle = createAsyncThunk(
  "article/unfavoriteArticle",
  (data, { rejectWithValue }) => {
    const url = `https://blog-platform.kata.academy/api/articles/${data.slug}/favorite`;
    console.log("article/unfavoriteArticle data", data);

    const config = {
      headers: {
        Authorization: `Bearer ${data.token}`,
        "Content-Type": "application/json",
      },
    };

    return axios
      .delete(url, config)
      .then((response) => {
        console.log("article when unfavoriteArticle", response);
        return response.data;
      })
      .catch((error) => {
        console.log("article when unfavoriteArticle error", error.message);
        return rejectWithValue(error.response?.data || error.message);
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
