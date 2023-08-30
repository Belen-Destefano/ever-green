import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mapImageUrl: '',
  address: '', 
};

const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {
    saveMapImageUrl(state, action) {
      state.mapImageUrl = action.payload;
    },
    saveAddress(state, action) { 
      state.address = action.payload;
    },
  },
});

export const { saveMapImageUrl, saveAddress  } = addressSlice.actions;

export default addressSlice.reducer;