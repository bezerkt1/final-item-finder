import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URL } from '../config/config';

const initialState = {
  isLoading: false,
  access_token: null,
  token_type: null,
  isNew: false,
  alert: { 
    show: false, 
    color: "", 
    text: "" 
  }
};

export const createUser = createAsyncThunk(
  "register/createUser",
  async (payload, thunkAPI) => {
    try {
      return fetch(`${API_URL}/users/`, {
        method: "POST",
        body: `username=${payload.username}&email=${payload.email}&password=${payload.password}`,
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

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    setIsNew: (state) => {
      state.isNew = !state.isNew;
    },
    setAlert: (state, action) => {
      state.alert = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        console.log("boop");
        state.access_token = action.payload.access_token;
        state.token_type = action.payload.token_type;
        state.isValid = true;
        state.isLoading = false;
      })
      .addCase(createUser.rejected, () => initialState)
  },
});

export const { setIsNew, setAlert } = registerSlice.actions;
export default registerSlice.reducer;