const initialState={
    paymentMethod:null, // All the payment method like stripe paypal will be store here
};


export const paymentMethodReducer=(state=initialState,action)=>{
    switch (action.type) {
        case "ADD_PAYMENT_METHOD":
            return {
                ...state,
                paymentMethod:action.payload
            };
        default:
            return state;        
    }
};
