import {configureStore} from "@reduxjs/toolkit"
import { producerReducer } from "./ProductReducer";
import { errorReducer } from "./errorReducer";

export const store = configureStore({
    reducer:{
        products:producerReducer,
        errors:errorReducer,
    },
    preloadedState:{},
});

export default store;