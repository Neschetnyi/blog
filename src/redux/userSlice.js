import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  bio: "",
  email: "",
  image: null,
  token: "",
  username: "",
  error: null,
};

export const createUser = createAsyncThunk(
  "user/createUser",
  (data, { rejectWithValue }) => {
    const url = `https://blog-platform.kata.academy/api/users`;
    const postData = {
      user: {
        username: data.username,
        email: data.email,
        password: data.password,
      },
    };
    return axios
      .post(`${url}`, postData)
      .then((response) => {})
      .catch((error) => {
        return rejectWithValue(error.response.data);
      });
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  (data, { rejectWithValue }) => {
    const url = `https://blog-platform.kata.academy/api/users/login`;
    const postData = {
      user: {
        email: data.email,
        password: data.password,
      },
    };
    return axios
      .post(`${url}`, postData)
      .then((response) => {
        localStorage.setItem(
          "user",
          JSON.stringify({
            token: response.data.user.token,
            username: response.data.user.username,
          })
        );
        return response.data;
      })
      .catch((error) => {
        return rejectWithValue(error.response.data);
      });
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  (data, { rejectWithValue }) => {
    const url = `https://blog-platform.kata.academy/api/user`;

    const postData = {
      user: {
        email: data.email,
        password: data.password,
        username: data.username,
        bio: data.bio,
        image: data.avatar,
      },
    };

    const config = {
      headers: {
        Authorization: `Bearer ${data.token}`,
        "Content-Type": "application/json",
      },
    };

    return axios
      .put(url, postData, config)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return rejectWithValue(error.response?.data);
      });
  }
);

export const getUser = createAsyncThunk(
  "user/getUser",
  (data, { rejectWithValue }) => {
    const url = `https://blog-platform.kata.academy/api/user`;

    const config = {
      headers: {
        Authorization: `Bearer ${data.token}`,
        "Content-Type": "application/json",
      },
    };

    return axios
      .get(url, config)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return rejectWithValue(error.response?.data);
      });
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    log_out: (state) => {
      state.bio = "";
      state.email = "";
      state.image = null;
      state.token = "";
      state.username = "";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createUser.rejected, (state, action) => {
      state.error = action.error;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.email = action.payload.user.email;
      state.token = action.payload.user.token;
      state.username = action.payload.user.username;
      state.image = action.payload.user.image;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.error = action.error;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.email = action.payload.user.email;
      state.token = action.payload.user.token;
      state.username = action.payload.user.username;
      state.image = action.payload.user.image;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.email = action.payload.user.email;
      state.token = action.payload.user.token;
      state.username = action.payload.user.username;
      state.image = action.payload.user.image;
    });
    builder.addCase(getUser.rejected, (state, action) => {
      state.error = action.error;
    });
  },
});

export default userSlice.reducer;
export const { log_out } = userSlice.actions;
