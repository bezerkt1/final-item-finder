import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';

const url = "http://basternet.ddns.net:8777/items";

// placeholder data for items
const initialState = {
  itemsArray: [],
  isLoading: true,
};

export const getItems = createAsyncThunk(
  async (payload, thunkAPI) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Response was not ok");
      }
      const data = await response.json();
      dispatch(items.actions.setItems(json));
      return data;
      
    } catch (error) {
      return thunkAPI.rejectWithValue("Something went wrong");
    }
  }
);

{/*
when fetching items data from API, sort by newest to oldest when saving to global state
  setItems(
    [...items].sort((a, b) => b.createdAt - a.createdAt)
  );
*/}

const itemSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.itemsArray = action.payload;
    },
    addItem: (state, action) => {
      state.itemsArray.push({
        name: action.payload.name,
        price: action.payload.price,
        id: uuidv4(),
        description: action.payload.description,
        latitude: 0.0,
        longitude: 0.0,
        user_id: 0,
        category_id: action.payload.category_id,
      });
    },
    removeItem: (state, action) => {
      // find item to update
      const index = state.itemsArray.findIndex((item) => item.id === action.payload.id);
      // remove that item
      if (index !== -1) {
        state.itemsArray.splice(index, 1);
      }
    },
    addFavorite: (state, action) => {
       // find item to update
       const index = state.itemsArray.findIndex((item) => item.id === action.payload.id);
       // change the favorite value of that item
       if (index !== -1) {
         state.itemsArray[index].favorite = !state.itemsArray[index].favorite;
       }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.itemsArray = action.payload;
      })
      .addCase(getItems.rejected, (state, action) => {
        state.isLoading = false;
        console.log(action);
      });
  },
});

export const { addFavorite, addItem, removeItem } = itemSlice.actions;
export default itemSlice.reducer;