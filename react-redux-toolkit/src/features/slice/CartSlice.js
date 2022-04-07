import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0
  },
  reducers: {
    changeCartItem(state, action){
      state.items = action.payload
    },

    addItemToCart(state, action) {
      // state.totalQuantity++;
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      if (!existingItem) {
        state.items.push({
          // itemId: newItem.id,
          // price: newItem.price,
          ...newItem,
          quantity: 1
          // totalPrice: newItem.price,
          // name: newItem.title
        });
        localStorage.setItem('cart', JSON.stringify(state.items));
      } else {
        existingItem.quantity++;
        // existingItem.totalPrice += newItem.price;
      }
    },
    decreaseQty(state, action){
      const currentProduct = state.items.find(item => item.id == action.payload.id);
      currentProduct.quantity--;
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

export const { changeCartItem,addItemToCart, removeItemFromCart,decreaseQty } = cartSlice.actions;
export default cartSlice.reducer;