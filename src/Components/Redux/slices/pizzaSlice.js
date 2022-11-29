import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus', async (params) => {
  const { sortBy, order, category, search, currentPage } = params;
  const { data } = await axios.get(
    `https://634812fbdb76843976b9b35d.mockapi.io/Collections?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
  );
  return data;
});

const initialState = {
  items: [],
  status: 'Loading', 
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: {
      [fetchPizzas.pending]: (state) => {
        state.status = "Loading";
        state.items = [];
      },
      [fetchPizzas.fulfilled]: (state, action) => {
        state.items = action.payload;
        state.status = "success";
      },
      [fetchPizzas.rejected]: (state) => {
        state.status = "error";
        state.items = [];
      },
  }
});

export const selectPizzaData = (state) => state.pizza

export const { setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;
