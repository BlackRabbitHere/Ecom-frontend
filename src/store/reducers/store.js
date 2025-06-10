import {configureStore} from "@reduxjs/toolkit"
import { producerReducer } from "./ProductReducer";
import { errorReducer } from "./errorReducer";
import { cartReducer } from "./cartReducer";
import { authReducer } from "./authReducer";
import { paymentMethodReducer } from "./paymentMethodReducer";

const cartItems=localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    :[];

const user=localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    :null;


const initialState={
    auth:{user:user},
    carts:{cart:cartItems},

};

const selectedUserCheckOutAddress=localStorage.getItem("CHECKOUT_ADDRESS")
    ? JSON.parse(localStorage.getItem("CHECKOUT_ADDRESS"))
    :[];

export const store = configureStore({
    reducer:{
        products:producerReducer,
        errors:errorReducer,
        carts:cartReducer,
        auth:authReducer,
        payment:paymentMethodReducer,
    },
    preloadedState:initialState,
});

export default store;