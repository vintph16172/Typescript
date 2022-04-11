import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { listCart, listCartDetail, addCart, updateCart, removeCart } from "../../api/cart";
import { addDetailCart, listDetailCart, listDetailCartById, removeDetailCart, updateDetailCart } from "../../api/detailCart";

export const getCarts = createAsyncThunk(
  "cart/getCarts",
  async () => {
    const { data } = await listCart()
    return data
  }
)

export const getCartDetail = createAsyncThunk(
  "cart/getCartDetail",
  async (email) => {
    const { data } = await listCartDetail(email)
    return data
  }
)

export const addCarts = createAsyncThunk(
  "cart/addCarts",
  async (cart) => {
    const { data } = await addCart(cart)
    return data
  }
)

export const editCarts = createAsyncThunk(
  "cart/editCarts",
  async (cart) => {
    const { data } = await updateCart(cart)
    return data
  }
)


export const deleteCarts = createAsyncThunk(
  "cart/deleteCarts",
  async (id) => {
    const { data } = await removeCart(id)
    return data
  }
)
//-----------------------------------CART-------------------------------

export const getDetailCarts = createAsyncThunk(
  "detailcart/getDetailCarts",
  async () => {
    const { data } = await listDetailCart()
    return data
  }
)

export const getDetailCartByID = createAsyncThunk(
  "detailcart/getDetailCartByID",
  async (id) => {
    const { data } = await listDetailCartById(id)
    return data
  }
)

export const addDetailCarts = createAsyncThunk(
  "detailcart/addDetailCarts",
  async (cart) => {
    const { data } = await addDetailCart(cart)
    return data
  }
)

export const editDetailCarts = createAsyncThunk(
  "detailcart/editDetailCarts",
  async (cart) => {
    const { data } = await updateDetailCart(cart)
    return data
  }
)


export const deleteDetailCarts = createAsyncThunk(
  "detailcart/deleteDetailCarts",
  async (id) => {
    const { data } = await removeDetailCart(id)
    return data
  }
)
//--------------------DETAIL-CART------------------------------------


const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    listCart: [],
    listDetailCart: [],
    selected: [],
    orderHistory: [],
    totalQuantity: 0
  },
  reducers: {
    changeCartItem(state, action) {
      state.items = action.payload
    },
    changeTotalQuantity(state, action) {

      state.totalQuantity = action.payload
    },
    onSelected(state, action) {
      state.selected = action.payload

      // console.log(action.payload);
    },
    changeOrderHistory(state, action) {

      state.orderHistory = action.payload
    },

    addItemToCart(state, action) {
      // state.totalQuantity++;
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item._id === newItem._id);
      if (!existingItem) {
        state.items.push({
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

      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    decreaseQty(state, action) {
      const currentProduct = state.items.find(item => item._id == action.payload._id);
      currentProduct.quantity--;

      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    increaseQty(state, action) {
      const currentProduct = state.items.find(item => item._id == action.payload._id).quantity++;

      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    removeItemFromCart(state, action) {
      const id = action.payload;
      const currentProduct = state.items.find(item => item._id == action.payload._id);
      state.items = state.items.filter((item) => item._id !== id);

      localStorage.setItem('cart', JSON.stringify(state.items));
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getCarts.fulfilled, (state, action) => {
      state.listCart = action.payload
    })
    builder.addCase(getCartDetail.fulfilled, (state, action) => {
      state.orderHistory = action.payload
    })
    builder.addCase(deleteCarts.fulfilled, (state, action) => {

      state.listCart = state.listCart.filter(item => item._id !== action.payload._id)

    })
    builder.addCase(addCarts.fulfilled, (state, action) => {

      state.listCart = [...state.listCart, action.payload]

    })
    builder.addCase(editCarts.fulfilled, (state, action) => {

      state.listCart = state.listCart.map(item => item._id === action.payload._id ? action.payload : item)

    })

    //-----------------------------------CART-------------------------------

    builder.addCase(getDetailCarts.fulfilled, (state, action) => {
      state.listDetailCart = action.payload
    })
    builder.addCase(deleteDetailCarts.fulfilled, (state, action) => {

      state.listDetailCart = state.listDetailCart.filter(item => item._id !== action.payload._id)

    })
    builder.addCase(addDetailCarts.fulfilled, (state, action) => {

      state.listDetailCart = [...state.listDetailCart, action.payload]

    })
    builder.addCase(editDetailCarts.fulfilled, (state, action) => {

      state.listDetailCart = state.listDetailCart.map(item => item._id === action.payload._id ? action.payload : item)

    })

    //----------------------------------DETAIL-CART-------------------------------



  }
});

export const { onSelected,changeCartItem, changeTotalQuantity, addItemToCart, removeItemFromCart, decreaseQty, increaseQty } = cartSlice.actions;
export default cartSlice.reducer;