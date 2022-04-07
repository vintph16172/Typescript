import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0
  },
  reducers: {
    addItemToCart(state, action) {
      // state.totalQuantity++;
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      if (!existingItem) {
        state.item.push({
          // itemId: newItem.id,
          // price: newItem.price,
          ...newItem,
          quantity: 1
          // totalPrice: newItem.price,
          // name: newItem.title
        });
      } else {
        existingItem.quantity++;
        // existingItem.totalPrice += newItem.price;
      }
    },
    removeItemFromCart(state, action) {
      // state.totalQuantity--;
      const id = action.payload;
      // const existingItem = state.items.find((item) => item.id === id);
      // if (existingItem.quantity === 1) {
      state.items = state.items.filter((item) => item.id !== id);
      // } else {
      //   existingItem.quantity--;
      //   existingItem.totalPrice -= existingItem.price;
      // }
    }
  }
});

export const { addItemToCart, removeItemFromCart } = cartSlice.actions;
export default cartSlice.reducer;