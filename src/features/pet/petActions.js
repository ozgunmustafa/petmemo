import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
//import { setCollection } from './petSlice';

const apiUrl = 'https://petstore.swagger.io/v2';

export const getPetById = createAsyncThunk(
  'pet/create',
  async ({ id }, { dispatch, rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const { data } = await axios.get(`${apiUrl}/pet/${id}`, config);

      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        console.log(error.response, error.response.data.message);
        return rejectWithValue(error.response.data.message);
      } else {
        console.log(error.response, error.response.data.message);
        return rejectWithValue(error.message);
      }
    }
  },
);

export const createPetCall = createAsyncThunk(
  'pet/create',
  async ({ category, name, tags }, { dispatch, rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const { data } = await axios.post(
        `${apiUrl}/pet`,
        {
          name: name,
          category: {
            name: category,
          },
          tags: tags,
        },
        config,
      );

      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        console.log(error.response, error.response.data.message);
        return rejectWithValue(error.response.data.message);
      } else {
        console.log(error.response, error.response.data.message);
        return rejectWithValue(error.message);
      }
    }
  },
);
