import { createSlice } from "@reduxjs/toolkit";
import productService from "../services/product.service";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
  },
  reducers: {
    productsRequested: (state) => {
      state.isLoading = true;
    },
    productsReceved: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    productsRequestFiled: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    addNewProduct: (state, action) => {
      state.entities.push(action.payload);
      return state;
    },
  },
});

const { reducer: productsRedusers, actions } = productsSlice;
const {
  productsRequested,
  productsReceved,
  productsRequestFiled,
  addNewProduct,
} = actions;

export const loadProductsList = () => async (dispatch) => {
  dispatch(productsRequested());
  try {
    const { content } = await productService.get();
    dispatch(productsReceved(content));
  } catch (error) {
    dispatch(productsRequestFiled(error.message));
  }
};
export const addProduct = (product) => async (dispatch) => {
  dispatch(productsRequested());
  try {
    const { content } = await productService.create(product);
    dispatch(addNewProduct(content));
  } catch (error) {
    dispatch(productsRequestFiled(error.message));
  }
};
export const updateQuantityProduct = () => async (dispatch) => {
  dispatch(productsRequested());
  try {
    await productService.updateQuantity();
  } catch (error) {
    dispatch(productsRequestFiled(error.message));
  }
};

export const getProductsList = () => (state) => state.products.entities;
export const getProductById = (id) => (state) => {
  if (!state.products.isLoading) {
    return state.products.entities.find((item) => {
      return item._id === id;
    });
  }
};
export const getProductsLoadingStatus = () => (state) =>
  state.products.isLoading;

export default productsRedusers;
