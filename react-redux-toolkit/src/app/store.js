import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/slice/ProductSlice'
import categoryReducer from '../features/slice/CategorySlice'


export const store = configureStore({
  reducer: {
    products : productReducer,
    category : categoryReducer
  },
});
