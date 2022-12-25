import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cartRedusers from "./cart";
import colorsRedusers from "./color";
import favoriteRedusers from "./favorite";
import productsRedusers from "./products";
import sizesRedusers from "./size";
import typeRedusers from "./type";
import usersReducer from "./users";

const rootReducer = combineReducers({
  products: productsRedusers,
  cart: cartRedusers,
  favorite: favoriteRedusers,
  type: typeRedusers,
  colors: colorsRedusers,
  sizes: sizesRedusers,
  users: usersReducer,
});

export function createStore() {
  return configureStore({
    reducer: rootReducer,
  });
}
