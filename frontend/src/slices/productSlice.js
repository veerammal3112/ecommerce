import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    loading: false,
    product: {},
  },
  reducers: {
    productRequest(state, action) {
      return {
        loading: true,
      };
    },
    // this is created to get the product values from the server
    productSuccess(state, action) {
      return {
        loading: false,
        product: action.payload.product,
      };
    },
    productFail(state, action) {
      return {
        loading: false,
        error: action.payload,
      }
    }
  }
});

const { actions, reducer } = productSlice;

export const { productRequest, productSuccess, productFail } = actions;

export default reducer;
