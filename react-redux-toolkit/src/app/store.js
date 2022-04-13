import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/slice/ProductSlice'
import categoryReducer from '../features/slice/CategorySlice'
import userReducer from '../features/slice/UserSlice'
import cartReducer from '../features/slice/CartSlice'
import commentReducer from '../features/slice/CommentSlice'

export const store = configureStore({
  reducer: {
    products : productReducer,
    category : categoryReducer,
    user : userReducer,
    cart :cartReducer,
    comment: commentReducer
  },
});
