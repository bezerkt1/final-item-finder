import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { API_URL } from "../config/config";

const initialState = {
  itemsArray: [],
  categories: [],
  favorites: [],
  isLoading: true,
};

export const getItems = createAsyncThunk(
  "item/getItems",
  async (payload, thunkAPI) => {
    try {
      const response = await fetch(`${API_URL}/items/`);
      if (!response.ok) {
        throw new Error("Response was not ok");
      }
      return await response.json();
    } catch (error) {
      return thunkAPI.rejectWithValue("Something went wrong");
    }
  }
);

export const getFavorites = createAsyncThunk(
  "item/getFavorites",
  async (payload, thunkAPI) => {
    const state = thunkAPI.getState();
    try {
      console.log("Making fetch faves request");
      const response = await fetch(`${API_URL}/items/favorites`, {
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `${state.login.token_type} ${state.login.access_token}`,
        }),
      });
      if (!response.ok) {
        throw new Error("Response was not ok");
      }
      console.log("Received getFavorites response", response);
      return response.json();
    } catch (error) {
      return thunkAPI.rejectWithValue("Something went wrong");
    }
  }
);

export const getCategories = createAsyncThunk(
  "item/getCategories",
  async (payload, thunkAPI) => {
    try {
      const response = await fetch(`${API_URL}/categories/`);
      if (!response.ok) {
        throw new Error("Response was not ok");
      }
      return response.json();
    } catch (error) {
      return thunkAPI.rejectWithValue("Something went wrong");
    }
  }
);

export const favoriteItem = createAsyncThunk(
  "item/favoriteItem",
  async (payload, thunkAPI) => {
    console.log("Executing favoriteItem");
    const state = thunkAPI.getState();
    try {
      console.log("Making patch request");
      const response = await fetch(`${API_URL}/items/favorite/${payload}`, {
        method: "PATCH",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `${state.login.token_type} ${state.login.access_token}`,
        }),
      });
      if (!response.ok) {
        throw new Error("Response was not ok");
      }
      console.log("Received favoriteItem response", response);
      return response.json();
    } catch (error) {
      return thunkAPI.rejectWithValue("Something went wrong");
    }
  }
);

export const createItem = createAsyncThunk(
  "item/createItem",
  async (payload, thunkAPI) => {
    console.log("Executing createItem");
    const state = thunkAPI.getState();
    try {
      console.log("Making post request");
      const response = await fetch(`${API_URL}/items/` , {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `${state.login.token_type} ${state.login.access_token}`,
        }),
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error("Response was not ok");
      }
      console.log("Received createItem response", response);
      return response.json();
    } catch (error) {
      return thunkAPI.rejectWithValue("Something went wrong");
    }
  }
);

export const deleteItem = createAsyncThunk(
  "item/deleteItem",
  async (payload, thunkAPI) => {
    console.log("Executing deleteItem");
    const state = thunkAPI.getState();
    try {
      console.log("Making delete request");
      const response = await fetch(`${API_URL}/items/${payload}` , {
        method: "DELETE",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `${state.login.token_type} ${state.login.access_token}`,
        }),
        body: `id: ${payload}`,
        mode: "no-cors"
      });
      if (!response.ok) {
        throw new Error("Response was not ok");
      }
      console.log("Received deleteItem response", response);
      return response.json();
    } catch (error) {
      return thunkAPI.rejectWithValue("Something went wrong");
    }
  }
);

const itemSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    addFavorite: (state, action) => {
      const index = state.favorites.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        return;
      }
      state.favorites.push({
        name: action.payload.name,
        price: action.payload.price,
        id: action.payload.id,
        description: action.payload.description,
        latitude: 0.0, // pull from user's location
        longitude: 0.0, // pull from user's location
        favorite: true, // temp to test favorite
        user_id: 0, // pull from login credentials
        category_id: action.payload.category_id,
      });
    },
    removeFavorite: (state, action) => {
      const index = state.favorites.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.favorites.splice(index, 1);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getItems.fulfilled, (state, action) => {
        state.itemsArray = action.payload;
        state.isLoading = false;
      })
      .addCase(getItems.rejected, (state, action) => {
        state.isLoading = false;
        console.log(action);
      })
      .addCase(getCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.isLoading = false;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.isLoading = false;
        console.log(action);
      })
      .addCase(getFavorites.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFavorites.fulfilled, (state, action) => {
        state.favorites = action.payload;
        state.isLoading = false;
      })
      .addCase(getFavorites.rejected, (state, action) => {
        state.isLoading = false;
        console.log(action);
      })
      .addCase(favoriteItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(favoriteItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.favorites.push(action.payload);
        console.log("faveoriteItem payload", action.payload);
      })
      .addCase(favoriteItem.rejected, (state, action) => {
        state.isLoading = false;
        console.log(action);
      })
      .addCase(createItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.itemsArray.push(action.payload);
        console.log("createItem payload", action.payload);
      })
      .addCase(createItem.rejected, (state, action) => {
        state.isLoading = false;
        console.log(action);
      })
      .addCase(deleteItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.isLoading = false;
        // find item
        const index = state.itemsArray.findIndex(
          (item) => item.id === action.payload);
        // remove that item
        if (index !== -1) {
          state.itemsArray.splice(index, 1);
        }
        console.log("deleteItem payload", action.payload);
      })
      .addCase(deleteItem.rejected, (state, action) => {
        state.isLoading = false;
        console.log(action);
      })
      ;
  },
});

export const { addFavorite, removeFavorite } =
  itemSlice.actions;
export default itemSlice.reducer;
