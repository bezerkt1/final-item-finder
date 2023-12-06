import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    longitude: "",
    latitude: ""
  };

export const locationSlice = createSlice({
  name: 'location',
  initialState: initialState,
  reducers: {
      setLocation: (state, action) => {
        state.longitude = action.payload.longitude;
        state.latitude = action.payload.latitude;
      }
  } 
});

export const { setLocation } = locationSlice.actions;

export default locationSlice.reducer;

  