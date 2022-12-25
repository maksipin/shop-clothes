import { createSlice } from "@reduxjs/toolkit";
import colorsService from "../services/color.service";

const colorsSlice = createSlice({
  name: "colors",
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
  },
  reducers: {
    colorsRequested: (state) => {
      state.isLoading = true;
    },
    colorsReceved: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    colorRemoved: (state, action) => {
      const newColorsList = state.entities.filter(
        (item) => item._id !== action.payload
      );
      state.entities = newColorsList;
      state.isLoading = false;
    },
    colorRequestFiled: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

const { reducer: colorsRedusers, actions } = colorsSlice;
const { colorsRequested, colorsReceved, colorsRequestFiled } = actions;

export const loadColorsList = () => async (dispatch) => {
  dispatch(colorsRequested());
  try {
    const { content } = await colorsService.get();
    dispatch(colorsReceved(content));
  } catch (error) {
    dispatch(colorsRequestFiled(error.message));
  }
};

export const removeColorById = (id) => async (dispatch) => {
  dispatch(colorsRequested());
  try {
    const { content } = await colorsService.deleteById(id);
    dispatch(colorsReceved(content));
  } catch (error) {}
};
export const updateColorById = (id) => async (dispatch) => {
  dispatch(colorsRequested());
  try {
    const { content } = await colorsService.updateById(id);
    dispatch(colorsReceved(content));
  } catch (error) {}
};

export const addColor = (color) => async (dispatch) => {
  dispatch(colorsRequested());
  try {
    const { content } = await colorsService.create(color);
    dispatch(colorsReceved(content));
  } catch (error) {}
};

export const getColors = () => (state) => state.colors.entities;
export const getColorsLoadingStatus = () => (state) => state.colors.isLoading;

export default colorsRedusers;
