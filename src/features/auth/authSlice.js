import { createSlice } from '@reduxjs/toolkit';
import { loginCall } from './authActions';

const userToken = localStorage.getItem('userToken')
  ? localStorage.getItem('userToken')
  : null;

const initialState = {
  loading: false,
  userInfo: null,
  userToken,
  error: null,
  success: false,
};

const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: {
    [loginCall.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [loginCall.fulfilled]: (state, { payload }) => {
      console.log(payload);
      state.loading = false;
      state.userInfo = payload;
    },
    [loginCall.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

//export const { logout, setCredentials } = authSlice.actions;

export default authSlice.reducer;
