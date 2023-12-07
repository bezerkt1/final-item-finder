import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { API_URL } from "../config/config";

// placeholder data for items
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

// thunk using .then .catch instead of try catch
// export const getItems = createAsyncThunk(
//   "item/getItems",
//   (payload, thunkAPI) => {
//     return fetch(`${API_URL}/items/`)
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Response was not ok");
//         }
//         thunkAPI.dispatch(setItems(response.json()));
//         return response.json();
//       })
//       .then(data => {
//         return data;
//       })
//       .catch((error) => {
//       return thunkAPI.rejectWithValue("Something went wrong");
//     });
//   }
// );

export const getFavorites = createAsyncThunk(
  "item/getFavorites",
  async (payload, thunkAPI) => {
    const state = thunkAPI.getState();
    try {
      const response = await fetch(`${API_URL}/items/favorites`, {
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `${state.login.token_type} ${state.login.access_token}`,
        }),
      });
      if (!response.ok) {
        throw new Error("Response was not ok");
      }
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
    try {
      const response = await fetch(`${API_URL}/items/favorite/${payload}`, {
        headers: new Headers({
          method: "PATCH",
          "Content-Type": "application/json",
          Authorization: `${state.login.token_type} ${state.login.access_token}`,
        }),
      });
      if (!response.ok) {
        throw new Error("Response was not ok");
      }
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
    addItem: (state, action) => {
      state.itemsArray.push({
        name: action.payload.name,
        price: action.payload.price,
        id: uuidv4(),
        description: action.payload.description,
        longitude: action.payload.longitude,
        latitude: action.payload.latitude,
        favorite: false, // temp to test favorite
        user_id: 0, // pull from login credentials
        category_id: action.payload.category_id,
      });
    },
    removeItem: (state, action) => {
      // find item to update
      const index = state.itemsArray.findIndex(
        (item) => item.id === action.payload.id
      );
      // remove that item
      if (index !== -1) {
        state.itemsArray.splice(index, 1);
      }
    },
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
        console.log("pop");
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
      })
      .addCase(favoriteItem.rejected, (state, action) => {
        state.isLoading = false;
        console.log(action);
      });
  },
});

export const { addFavorite, addItem, removeItem, removeFavorite } =
  itemSlice.actions;
export default itemSlice.reducer;
