import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    // Общая сумма
    totalPrice: 0,
    // Товары
    items: []
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
    // Найти мне этот объект в массиве
      const findItem = state.items.find((obj) => obj.id === action.payload.id)
    // Если он есть, увеличь его на ++, на 1
      if (findItem) {
        findItem.count++;
      } else {
    // Если он не нашелся, то мы добавляем новый объект
      state.items.push({
        ...action.payload, 
        count: 1
      })
    } 

      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum
      }, 0)
    },
    
    minusItem(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload)
      if (findItem) {
        findItem.count--
      }
    },
    removeItem(state, action) {
      state.items = state.items.filter((obj) => obj.id !== action.payload)
    },
    clearItems(state) {
        state.items = [];
        state.totalPrice = 0;
    }
  },
});

export const selectCart = (state) => state.cart

export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions;
export default cartSlice.reducer;