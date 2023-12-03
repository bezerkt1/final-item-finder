import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const url = "http://basternet.ddns.net:8777/token/";

const initialState = {
  isLoading: false,
  access_token: localStorage.getItem("access_token"),
  token_type: localStorage.getItem("token_type"),
};

export const getToken = createAsyncThunk(
  "login/getToken",
  async (payload, thunkAPI) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        body: `username=${payload.username}&password=${payload.password}`,
        headers: new Headers({
          "Content-Type": "application/x-www-form-urlencoded",
        }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      if (payload.remember) {
        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("token_type", data.token_type);
      }
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    test: (state, action) => {
      console.log("state", state);
      console.log("action", action);
    },
    logout: (state) => {
      localStorage.removeItem("access_token");
      localStorage.removeItem("token_type");
      state.access_token = null;
      state.token_type = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getToken.pending, (state) => {
        console.log("logging in...");
        state.isLoading = true;
      })
      .addCase(getToken.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action.payload);
        state.access_token = action.payload.access_token;
        state.token_type = action.payload.token_type;
      })
      .addCase(getToken.rejected, (state, action) => {
        console.log(action);
        state.isLoading = false;
      });
  },
});

export const { test, logout } = loginSlice.actions;

export default loginSlice.reducer;
