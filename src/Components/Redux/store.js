import { configureStore } from '@reduxjs/toolkit'
import filter from './slices/filterSlice'

// configureStore - создает хранилища, а внутри уже сидят работники
export const store = configureStore({
  reducer: {
    filter
  },
})