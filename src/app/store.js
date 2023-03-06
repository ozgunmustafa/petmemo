import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import petReducer from '../features/pet/petSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    pet: petReducer,
  },
});
export default store;
