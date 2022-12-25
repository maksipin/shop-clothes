import { createSlice } from "@reduxjs/toolkit";
import cartService from "../services/cart.service";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    entities: [],
    isLoading: true,
    error: null,
  },
  reducers: {
    cartRequested: (state) => {
      state.isLoading = true;
    },
    cartReceved: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    cartUpdatedItem: (state, action) => {
      state.entities = state.entities.map((item) => {
        if (item._id === action.payload._id) return action.payload;
        return item;
      });
      state.isLoading = false;
    },
    cartRemovedItem: (state, action) => {
      state.entities = state.entities.filter(
        (item) => item._id !== action.payload
      );
      state.isLoading = false;
    },
    cartRequestFiled: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

const { reducer: cartRedusers, actions } = cartSlice;
const {
  cartRequested,
  cartReceved,
  cartRequestFiled,
  cartUpdatedItem,
  cartRemovedItem,
} = actions;

export const loadCartList = () => async (dispatch) => {
  dispatch(cartRequested());
  try {
    const { content } = await cartService.get();
    dispatch(cartReceved(content));
  } catch (error) {
    dispatch(cartRequestFiled(error.message));
  }
};

export const removeCartById = (id) => async (dispatch) => {
  dispatch(cartRequested());
  try {
    await cartService.delete(id);
    dispatch(cartRemovedItem(id));
  } catch (error) {}
};
export const addCartItem = (item) => async (dispatch) => {
  dispatch(cartRequested());
  try {
    const { content } = await cartService.create(item);
    dispatch(cartReceved(content));
  } catch (error) {}
};
export const updateCartItem = (item) => async (dispatch) => {
  dispatch(cartRequested());
  try {
    await cartService.update(item._id, item);
    dispatch(cartUpdatedItem(item));
  } catch (error) {}
};

export const getCart = () => (state) => state.cart.entities;
export const getCartLoadingStatus = () => (state) => state.cart.isLoading;
export const getIsProductInCart = (product_id, feature) => (state) =>
  state.cart.entities.some(
    (item) =>
      item.product_id === product_id &&
      item.feature.size === feature.size &&
      item.feature.color.code === feature.color.code
  );

export default cartRedusers;
