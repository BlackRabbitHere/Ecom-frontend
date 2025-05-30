import {configureStore} from "@reduxjs/toolkit"
import { producerReducer } from "./ProductReducer";
import { errorReducer } from "./errorReducer";
import { cartReducer } from "./cartReducer";

const cartItems=localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    :[];

const initialState={
    carts:{cart:cartItems},

};


export const store = configureStore({
    reducer:{
        products:producerReducer,
        errors:errorReducer,
        carts:cartReducer
    },
    preloadedState:initialState,
});

export default store;