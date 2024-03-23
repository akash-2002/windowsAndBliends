import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import store from "../store";

const serverUrl = import.meta.env.VITE_SERVER_URL;

const initialState = {
  status: null,
  items: [],
  productDetails: {},
};

//action creator
export const productsFetch = createAsyncThunk(
  //action type
  "products/productsFetch",
  //payloadCreator
  async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/getProducts`
    );
    return response?.data;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addToProductDetails: (state, { payload }) => {
      console.log("payload: ", payload);
      state.productDetails = payload;
    },
    deleteProduct: (state, { payload }) => {
      console.log("reducer called");
      state.items = payload;
    },
    addProduct: (state, { payload }) => {
      state.items = [
        ...state.items,
        {
          ...payload,
          categories: payload.category_name,
          product_name: payload.name,
        },
      ];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(productsFetch.pending, (state, { payload }) => {
      state.status = "pending";
    });
    builder.addCase(productsFetch.fulfilled, (state, { payload }) => {
      state.status = "success";
      console.log("payload: ", payload);
      state.items = payload;
    });
    builder.addCase(productsFetch.rejected, (state, { payload }) => {
      state.status = "No Product Found";
    });
  },
});
export const { addToProductDetails, deleteProduct, addProduct } =
  productsSlice.actions;

export default productsSlice.reducer;
