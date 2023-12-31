import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URL } from "../config/config";

const initialState = {
  isLoading: false,
  isValid: false,
  userId: false,
  access_token: null,
  token_type: null,
};

export const validateToken = createAsyncThunk(
  "login/validateToken",
  async (payload, thunkAPI) => {
    console.log("validating...");
    const state = thunkAPI.getState();
    try {
      return fetch(`${API_URL}/validate/`, {
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `${state.login.token_type} ${state.login.access_token}`,
        }),
      }).then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      });
    } catch (error) {
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);

export const getToken = createAsyncThunk(
  "login/getToken",
  async (payload, thunkAPI) => {
    try {
      return fetch(`${API_URL}/token/`, {
        method: "POST",
        body: `username=${payload.username}&password=${payload.password}`,
        headers: new Headers({
          "Content-Type": "application/x-www-form-urlencoded",
        }),
      }).then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      });
    } catch (error) {
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    logout: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getToken.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getToken.fulfilled, (state, action) => {
        state.access_token = action.payload.access_token;
        state.token_type = action.payload.token_type;
        state.isValid = true;
        state.isLoading = false;
      })
      .addCase(getToken.rejected, () => initialState)
      .addCase(validateToken.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(validateToken.fulfilled, (state, action) => {
        state.isValid = true;
        state.userId = action.payload.id;
        state.isLoading = false;
      })
      .addCase(validateToken.rejected, () => initialState);
  },
});

export const { test, logout } = loginSlice.actions;

export default loginSlice.reducer;
