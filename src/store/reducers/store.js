import {configureStore} from "@reduxjs/toolkit"
import { producerReducer } from "./ProductReducer";

export const store = configureStore({
    reducer:{
        products:producerReducer,
    },
    preloadedState:{},
});

export default store;