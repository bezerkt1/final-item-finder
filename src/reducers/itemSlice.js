import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../config/config";

const initialState = {
  itemsArray: [],
  myItems: [],
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
      console.log(error);
      return thunkAPI.rejectWithValue("Something went wrong");
    }
  }
);

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
        throw new Error("Response was not ok");
      }
      console.log("Received getMyItems response", response);
      return await response.json();
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue("Something went wrong");
    }
  },
  // for getMyItems optimistic update
  {
    onMutate: (newItem) => {
      thunkAPI.dispatch(addItem(newItem));
    },
    onError: (error, newItem, thunkAPI) => {
      thunkAPI.dispatch(removeItem(newItem));
    },
    onSettled: (newItem, thunkAPI) => {
      thunkAPI.dispatch(updateItem(newItem));
    },
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
      console.log(error);
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
      console.log(error);
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
        body: `id: ${payload}`
      });
      if (!response.ok) {
        throw new Error("Response was not ok");
      }
      console.log("Received favoriteItem response", response);
      return response.json();
    } catch (error) {
      console.log(error);
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
        mode: "no-cors"
      });
      if (!response.ok) {
        throw new Error("Response was not ok");
      }
      console.log("Received createItem response", response);
      return response.json();
    } catch (error) {
      console.log(error);
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
        body: `id: ${payload}`
      });
      if (!response.ok) {
        throw new Error("Response was not ok");
      }
      console.log("Received deleteItem response", response);
      return response.json();
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue("Something went wrong");
    }
  }
);

const itemSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    removeFavorite: (state, action) => {
      const index = state.favorites.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.favorites.splice(index, 1);
      }
    },
    // for getMyItems optimistic update
    addItem: (state, action) => {
      state.push(action.payload);
    },
    removeItem: (state, action) => {
      return state.filter((item) => item.id !== action.payload);
    },
    updateItem: (state, action) => {
      const index = state.findIndex((item) => item.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    }
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
        console.log("favoriteItem payload", action.payload);
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

export const { removeFavorite, addItem, removeItem, updateItem } =
  itemSlice.actions;
export default itemSlice.reducer;
