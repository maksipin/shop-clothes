import { createSlice } from "@reduxjs/toolkit";
import typeService from "../services/type.service";

const typeSlice = createSlice({
  name: "type",
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
  },
  reducers: {
    typeRequested: (state) => {
      state.isLoading = true;
    },
    typeReceved: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    typeRequestFiled: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    typeRemoved: (state, action) => {
      const newTypesList = state.entities.filter(
        (item) => item._id !== action.payload
      );
      state.entities = newTypesList;
      state.isLoading = false;
    },
  },
});

const { reducer: typeRedusers, actions } = typeSlice;
const { typeRequested, typeReceved, typeRequestFiled } = actions;

export const loadTypeList = () => async (dispatch) => {
  dispatch(typeRequested());
  try {
    const { content } = await typeService.get();
    dispatch(typeReceved(content));
  } catch (error) {
    dispatch(typeRequestFiled(error.message));
  }
};

export const removeTypeById = (id) => async (dispatch) => {
  dispatch(typeReceved());
  try {
    const { content } = await typeService.deleteTypeById(id);
    dispatch(typeReceved(content));
  } catch (error) {}
};

export const getTypes = () => (state) => state.type.entities;
export const getTypesLoadingStatus = () => (state) => state.type.isLoading;

export default typeRedusers;
