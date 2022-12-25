import { createSlice } from "@reduxjs/toolkit";
import sizesService from "../services/size.service";

const sizesSlice = createSlice({
  name: "sizes",
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
  },
  reducers: {
    sizesRequested: (state) => {
      state.isLoading = true;
    },
    sizesReceved: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    sizesRequestFiled: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

const { reducer: sizesRedusers, actions } = sizesSlice;
const { sizesRequested, sizesReceved, sizesRequestFiled } = actions;

export const loadSizesList = () => async (dispatch) => {
  dispatch(sizesRequested());
  try {
    const { content } = await sizesService.get();
    dispatch(sizesReceved(content));
  } catch (error) {
    dispatch(sizesRequestFiled(error.message));
  }
};

export const removeSizesById = (id) => async (dispatch) => {
  dispatch(sizesRequested());
  try {
    const { content } = await sizesService.deleteSizeById(id);
    dispatch(sizesReceved(content));
  } catch (error) {}
};
export const addSize = (size) => async (dispatch) => {
  dispatch(sizesRequested());
  try {
    const { content } = await sizesService.create(size);
    dispatch(sizesReceved(content));
  } catch (error) {}
};

export const getSizes = () => (state) => state.sizes.entities;
export const getSizesLoadingStatus = () => (state) => state.sizes.isLoading;

export default sizesRedusers;
