import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const url = "http://basternet.ddns.net:8777/";

const initialState = {
  isLoading: false,
  isValid: false,
  access_token: localStorage.getItem("access_token"),
  token_type: localStorage.getItem("token_type"),
};

if (initialState.access_token !== null && initialState.token_type !== null) {
  initialState.isValid = true;
}

export const validateToken = createAsyncThunk(
  "login/validateToken",
  async (payload, thunkAPI) => {
    const state = thunkAPI.getState();
    try {
      const response = await fetch(`${url}validate/`, {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `${state.login.token_type} ${state.login.access_token}`,
        }),
      });
      if (!response.ok) {
        localStorage.removeItem("token_type");
        localStorage.removeItem("access_token");
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);

export const getToken = createAsyncThunk(
  "login/getToken",
  async (payload, thunkAPI) => {
    try {
      const response = await fetch(`${url}token/`, {
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
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("token_type", data.token_type);
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
      state.access_token = "";
      state.token_type = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getToken.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getToken.fulfilled, (state, action) => {
        state.isLoading = false;
        state.access_token = action.payload.access_token;
        state.token_type = action.payload.token_type;
        state.isValid = true;
      })
      .addCase(getToken.rejected, (state, action) => {
        console.log(action);
        state.isLoading = false;
        state.isValid = false;
      })
      .addCase(validateToken.fulfilled, (state) => {
        state.isValid = true;
      })
      .addCase(validateToken.rejected, (state, action) => {
        console.log(action);
        state.access_token = null;
        state.token_type = null;
        state.isValid = false;
      });
  },
});

export const { test, logout } = loginSlice.actions;

export default loginSlice.reducer;
