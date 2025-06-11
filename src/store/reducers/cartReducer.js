const initialState={
    cart:[],
    totalPrice:0,
    cartId:null,

}



export const cartReducer=(state=initialState,action)=>{
    switch(action.type){
        case "ADD_CART":
            const productToAdd=action.payload;
            const exisitingProduct=state.cart.find(
                (item)=> item.productId===productToAdd.productId
            );
            if(exisitingProduct){
                const updatedCart=state.cart.map((item)=>{
                    if(item.productId===productToAdd.productId){
                        return productToAdd
                    }else{
                        return item;
                    }
                });

                return {
                    ...state,
                    cart:updatedCart,
                    cartId:0,
                }
            }else{
                const newCart=[...state.cart,productToAdd];
                return{
                    ...state,
                    cart:newCart,
                    cartId:0,
                }
            }
        case "REMOVE_CART":
            return {
                ...state,
                cartId:0,
                cart:state.cart.filter(
                    (item)=>item.productId!==action.payload.productId
                ),
            }
        case "CLEAR_CART":
            return{cart:[],totalPrice:0,cartId:null};
        case "GET_USER_CART_PRODUCTS":
            return{
                ...state,
                totalPrice:action.totalPrice,
                cart:action.payload,
                cartId:action.cartId,
            };
        default:
            return state;
    }
}

