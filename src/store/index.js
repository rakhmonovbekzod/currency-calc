import { configureStore } from '@reduxjs/toolkit'
import currency from "./slices/currency";

export const store = configureStore({
  reducer: {
    currency
  },  
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
       serializableCheck: false,
  }),
})