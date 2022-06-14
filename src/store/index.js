import { configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import currency from "./slices/currency";

const persistConfig = {
  key: 'currency',
  storage,
}

const persistedReducer = persistReducer(persistConfig, currency)
export const store = configureStore({
  reducer: {
    currency:persistedReducer
  },  
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
       serializableCheck: false,
  }),
})
export const persistor = persistStore(store)