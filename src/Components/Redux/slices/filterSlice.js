import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categoryID: 0,
  currentPage: 1,
  sort: {
    name: 'популярности',
    sortProperty: 'rating',
  },
};

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryID = action.payload;
    },
    setSort(state, action) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload
    },
    setFilter(state, action) {
      // Когда к тебе придет значение ты должен вшить то что есть из 
      // пайлоада
      state.currentPage = Number(action.payload.currentPage);
      state.sort = action.payload.sort;
      state.categoryID = Number(action.payload.categoryID);
    },
  },
});

export const selectorCategoryId = (state) => state.filter.categoryID
export const selectorSortType = (state) => state.filter.sort.sortProperty
export const selectorCurrentPage = ((state) => state.filter.currentPage)
export const selectSort = (state) => state.filter.sort

export const { setCategoryId, setSort, setCurrentPage, setFilter } = filterSlice.actions;
export default filterSlice.reducer;
