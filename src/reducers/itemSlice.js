import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../config/config";

const initialState = {
  itemsArray: [],
  myItems: [],
  categories: [],
  favorites: [],
  isLoading: true,
  selectedItem: null,
};

// fetch all items
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
      console.log(error);
      return thunkAPI.rejectWithValue("Something went wrong");
    }
  }
);

// fetch only items logged in user has added
export const getMyItems = createAsyncThunk(
  "item/getMyItems",
  async (payload, thunkAPI) => {
    const state = thunkAPI.getState();
    try {
      console.log("Making fetch my items request");
      const response = await fetch(`${API_URL}/items/user/me/`, {
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `${state.login.token_type} ${state.login.access_token}`,
        }),
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }
      console.log("Received getMyItems response", response);
      return await response.json();
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  },
);

// fetch only items logged in user has favorited
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
        const errorText = await response.text();
        throw new Error(errorText);
      }
      console.log("Received getFavorites response", response);
      return response.json();
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

// fetch categories
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
      console.log(error);
      return thunkAPI.rejectWithValue("Something went wrong");
    }
  }
);

// add to favorites list
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
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }
      console.log("Received favoriteItem response", response);
      return response.json();
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

// remove from favorites list
export const removeFavorite = createAsyncThunk(
  "item/removeFavorite",
  async (payload, thunkAPI) => {
    console.log("Executing removeFavorite");
    const state = thunkAPI.getState();
    try {
      console.log("Making patch request");
      const response = await fetch(`${API_URL}/items/favorite/${payload}`, {
        method: "PATCH",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `${state.login.token_type} ${state.login.access_token}`,
        }),
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }
      console.log("Received removeFavorite response", response);
      return response.json();
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

// add new item
export const createItem = createAsyncThunk(
  "item/createItem",
  async (payload, thunkAPI) => {
    console.log("Executing createItem", payload);
    const state = thunkAPI.getState();
    try {
      console.log("Making post request");
      const response = await fetch(`${API_URL}/items/`, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `${state.login.token_type} ${state.login.access_token}`,
        }),
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }
      console.log("Received createItem response", response);
      return response.json();
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

// delete item (only allowed for items added by user)
export const deleteItem = createAsyncThunk(
  "item/deleteItem",
  async (payload, thunkAPI) => {
    console.log("Executing deleteItem");
    const state = thunkAPI.getState();
    try {
      console.log("Making delete request");
      const response = await fetch(`${API_URL}/items/${payload}`, {
        method: "DELETE",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `${state.login.token_type} ${state.login.access_token}`,
        }),
        body: `id: ${payload}`,
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }
      console.log("Received deleteItem response", response);
      return response.json();
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

const itemSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    setSelectedItem: (state, action) => {
      state.selectedItem = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
    // fetch items
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
    // fetch items added by user
      .addCase(getMyItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMyItems.fulfilled, (state, action) => {
        state.myItems = action.payload;
        state.isLoading = false;
      })
      .addCase(getMyItems.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        console.log(action);
      })
    // fetch categories
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
    // fetch items favorited by user
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
    // add item to favorites
      .addCase(favoriteItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(favoriteItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.favorites.push(action.payload);
        console.log("favoriteItem payload", action.payload);
      })
      .addCase(favoriteItem.rejected, (state, action) => {
        state.isLoading = false;
        console.log(action);
      })
    // remove item from favorites
      .addCase(removeFavorite.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeFavorite.fulfilled, (state, action) => {
        state.isLoading = false;
        state.favorites = state.favorites.filter((item) => item.id !== action.payload.id);
        console.log("removeFavorite payload", action.payload);
      })
      .addCase(removeFavorite.rejected, (state, action) => {
        state.isLoading = false;
        console.log(action);
      })
    // add new item
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
    // delete item 
      .addCase(deleteItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.itemsArray = state.itemsArray.filter((item) => item.id !== action.payload.id);
        console.log("deleteItem payload", action.payload);
      })
      .addCase(deleteItem.rejected, (state, action) => {
        state.isLoading = false;
        console.log(action);
      });
  },
});

export const { setSelectedItem } = itemSlice.actions;
export default itemSlice.reducer;
