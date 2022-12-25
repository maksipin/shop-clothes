import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import favoriteService from "../services/favorite.service";
import localStorageService, {
  getFavoritesFromLocalStorage,
} from "../services/localStorage.service";

const favoriteSlice = createSlice({
  name: "favorite",
  initialState: {
    entities: [],
    isLoading: true,
    error: null,
  },
  reducers: {
    favoritesRequested: (state) => {
      state.isLoading = true;
    },
    favoritesReceved: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    favoritesRemoved: (state, action) => {
      const newFavoritesList = state.entities.filter(
        (item) => item._id !== action.payload
      );
      state.entities = newFavoritesList;
      state.isLoading = false;
    },
    favoritesRequestFiled: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    favoritesAdded: (state, action) => {
      const arr = [...state.entities];
      arr.push(action.payload);
      state.entities = arr;
      state.isLoading = false;
    },
    favoritesAdded: (state, action) => {
      const arr = [...state.entities];
      arr.push(action.payload);
      state.entities = arr;
      state.isLoading = false;
    },
  },
});

const { reducer: favoriteRedusers, actions } = favoriteSlice;
const {
  favoritesRequested,
  favoritesReceved,
  favoritesRemoved,
  favoritesRequestFiled,
  favoritesAdded,
} = actions;

export const loadFavoritesList = (auth) => async (dispatch) => {
  dispatch(favoritesRequested());
  if (!auth) {
    const favorites = getFavoritesFromLocalStorage();
    if (favorites) dispatch(favoritesReceved(favorites));
    else dispatch(favoritesReceved([]));
  } else {
    try {
      const { content } = await favoriteService.get();
      dispatch(favoritesReceved(content));
    } catch (error) {
      dispatch(favoritesRequestFiled(error.message));
    }
  }
};

export const removeFavoritesById = (id) => async (dispatch) => {
  dispatch(favoritesRequested());
  try {
    const { content } = await favoriteService.delete(id);
    dispatch(favoritesRemoved(id));
  } catch (error) {
    dispatch(favoritesRequestFiled(error.message));
  }
};

export const addFavoritesById = (favorite) => async (dispatch) => {
  dispatch(favoritesRequested());
  try {
    const { content } = await favoriteService.add(favorite);
    dispatch(favoritesAdded(content));
  } catch (error) {
    dispatch(favoritesRequestFiled(error.message));
  }
};
export const updateFavoritesList = () => async (dispatch) => {
  dispatch(favoritesRequested());
  const favorites = getFavoritesFromLocalStorage();
  try {
    await favoriteService.update(favorites);
    localStorageService.removeFavoritesFromLocalStorage();
  } catch (error) {
    dispatch(favoritesRequestFiled(error.message));
  }
};

export const getIsFavorite = (id) => (state) => {
  return state.favorite.entities.find((item) => item.product_id === id);
};
export const getFavoriteById = (id) => (state) => {
  return state.favorite.entities.filter((item) => item.product_id === id)[0];
};
export const getFavoritesList = () => (state) => state.favorite.entities;
export const getFavoritesIsLoading = () => (state) => state.favorite.isLoading;

export default favoriteRedusers;
