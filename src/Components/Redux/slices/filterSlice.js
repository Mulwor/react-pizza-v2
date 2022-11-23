import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  categoryID: 1,
  sort: {
    name: 'популярности', 
    sortProperty: 'rating' 
  }
}

export const filterSlice = createSlice({
  name: 'filters',
  initialState,     // Начальное его состояние
  reducers: {       // Экшены, которые будут отвечать за сохранения сортировки и филтрации
    
    // Когда функция вызовется она получит свое состояние (state) и действие (action)
    setCategoryId(state, action) {
      // значение хранится в payload
      state.categoryID = action.payload
    },

  },
})

// Все методы будут хранится в actions. Так устроен редакс
export const { setCategoryId } = filterSlice.actions

// Указываем по умолчанию, что будем экспортировать редьюсер
export default filterSlice.reducer;