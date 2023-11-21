import {createSlice} from '@reduxjs/toolkit'

const productsSlice = createSlice({
    name: 'products',
    initialState: {
        loading: false
    },
    reducers: {
        productsRequest(state, action) {
            return {
                loading : true
            }
        },
        // this is created to get the product values from the server
        productsSuccess(state, action) {
            return{
                loading : false,
                products: action.payload.products,
                productsCount: action.payload.count,
                resPerPage: action.payload.resPerPage,
                currentPage: action.payload.currentPage
            }
        },
        productsFail(state, action) {
            return {
                loading : false,
                error: action.payload
            }
        }, 
    } 
});

const {actions, reducer} = productsSlice;

export const {productsRequest, productsSuccess, productsFail} = actions;

export default reducer;