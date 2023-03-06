import { createSlice } from '@reduxjs/toolkit';
import { createPetCall, getPetById } from './petActions';

const initialState = {
  loading: false,
  error: null,
  success: false,
  data: [],
  petCollection: [],
};

const petSlice = createSlice({
  name: 'pet',
  initialState,
  reducers: {
    setCollection: (state, action) => {
      state.petCollection = [...state.petCollection, action.payload];
    },
  },
  extraReducers: {
    [createPetCall.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [createPetCall.fulfilled]: (state, { payload }) => {
      state.petCollection = [...state.petCollection, payload];

      state.loading = false;
      state.data = payload;
    },
    [createPetCall.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [getPetById.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getPetById.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.data = payload;
    },
    [getPetById.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});
export const { setCollection } = petSlice.actions;
export default petSlice.reducer;
