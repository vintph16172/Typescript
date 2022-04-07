import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/slice/ProductSlice'
import categoryReducer from '../features/slice/CategorySlice'
import userReducer from '../features/slice/UserSlice'

export const store = configureStore({
  reducer: {
    products : productReducer,
    category : categoryReducer,
    user : userReducer
  },
});
