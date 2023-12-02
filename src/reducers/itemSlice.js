import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';

// placeholder data for items
const initialState = [
  {
    id: uuidv4(),
    title: "29th",
    category: "category",
    desc: "desc",
    image: "https://picsum.photos/100/100)",
    datesUnavailable: [],
    created: "2023-11-29T18:32:53.205Z",
    sellerId: "id",
    location: [],
    favorite: true,
  },
  {
    id: uuidv4(),
    title: "28th",
    category: "category",
    desc: "desc",
    image: "https://picsum.photos/100/100)",
    datesUnavailable: [],
    created: "2023-11-28T18:32:53.205Z",
    sellerId: "id",
    location: [],
    favorite: false,
  },
  {
    id: uuidv4(),
    title: "30th",
    category: "category",
    desc: "desc",
    image: "https://picsum.photos/100/100)",
    datesUnavailable: [],
    created: "2023-11-30T18:32:53.205Z",
    sellerId: "id",
    location: [],
    favorite: false,
  }
];

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
    addFavorite: (state, action) => {
       // find item to update
       const index = state.findIndex((item) => item.id === action.payload.id);
       // if item found, update state
       if (index !== -1) {
         state[index].favorite = !state[index].favorite;
       }
    },
  },
});

export const { addFavorite } = itemSlice.actions;
export default itemSlice.reducer;