import toast from "react-hot-toast";
import api from "../../api/api"

export const fetchProducts=(queryString)=>async(dispatch)=>{
    try{
        dispatch({type:"IS_FETCHING"});
        const {data}=await api.get(`/public/products?${queryString}`);
        dispatch({
            type:"FETCH_PRODUCTS",
            payload:data.content,
            pageNumber:data.pageNumber,
            pageSize:data.pageSize,
            totalElements:data.totalElements,
            totalPages:data.totalPages,
            lastPage:data.lastPage,
        });
        dispatch({type:"IS_SUCCESS"});
    } catch(error){
        console.log(error);
        dispatch({
            type:"IS_ERROR",
            payload:error?.response?.data?.message || "Failed to fetch Products",
        });
    }
}

export const fetchCategories=()=>async(dispatch)=>{
    try{
        dispatch({type:"CATEGORY_LOADER"});
        const {data}=await api.get(`/public/categories`);
        dispatch({
            type:"FETCH_CATEGORIES",
            payload:data.content,
            pageNumber:data.pageNumber,
            pageSize:data.pageSize,
            totalElements:data.totalElements,
            totalPages:data.totalPages,
            lastPage:data.lastPage,
        });
        dispatch({type:"CATEGORY_SUCCESS"});
    } catch(error){
        console.log(error);
        dispatch({
            type:"IS_ERROR",
            payload:error?.response?.data?.message || "Failed to fetch categories",
        });
    }
}


export const addToCart=(data,qty=1,toast)=>
    (dispatch,getState)=>{
        //Find the product
        // console.log(getState());
        const {products}=getState().products;
        const getProduct=products.find(
            (item)=> item.productId===data.productId
        );

        //check for stocks
        const isQuantityExist=getProduct.quantity >= qty;

        //if in stock-> add
        if(isQuantityExist){
            dispatch({type:"ADD_CART",payload:{...data,quantity:qty}});
            toast.success(`${data?.productName} added to the cart`);
            localStorage.setItem("cartItems",JSON.stringify(getState().carts.cart));
        }else{
            //if not --> error
            toast.error(`Out of Stock`);
        }

};


// TO increase cart Quantity

export const increaseCartQuantity = 
    (data, toast, currentQuantity, setCurrentQuantity) =>
    (dispatch, getState) => {
        // Find the product
        const { products } = getState().products;
        // console.log(getState());
        const getProduct = products.find(
            (item) => item.productId === data.productId
        );

        const isQuantityExist = getProduct.quantity >= currentQuantity + 1;

        if (isQuantityExist) {
            const newQuantity = currentQuantity + 1;
            setCurrentQuantity(newQuantity);

            dispatch({
                type: "ADD_CART",
                payload: {...data, quantity: newQuantity },
            });
            localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
        } else {
            toast.error("Quantity Reached to Limit");
        }

    };


export const decreaseCartQuantity = 
    (data, newQuantity) =>
    (dispatch, getState) => {
    dispatch({
        type:"ADD_CART",
        payload:{...data,quantity:newQuantity}
    });
    localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
    
}


export const removeFromCart = 
    (data, toast) =>
    (dispatch, getState) => {
    dispatch({type:"REMOVE_CART",payload:data});
    toast.success(`${data.productName} is removed from cart`)
    localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
}


export const authenticateSignInUser
    =(sendData,toast,reset,navigate,setLoader)=>async(dispatch)=>{
        try{
            setLoader(true);
            const{data}=await api.post("/auth/signin",sendData);
            dispatch({type:"LOGIN_USER",payload:data});
            localStorage.setItem("auth",JSON.stringify(data));
            reset()
            toast.success("Login Success")
            navigate("/")
        } catch(error){
            // console.log(error);
            toast.error(error?.response?.data?.message||"Internal Server Error");
        } finally{
            setLoader(false);
        }
}


export const registerNewUser
    =(sendData,toast,reset,navigate,setLoader)=>async(dispatch)=>{
        try{
            setLoader(true);
            const{data}=await api.post("/auth/signup",sendData);
            reset()
            toast.success(data?.message || "User Registered Successfully")
            navigate("/login")
        } catch(error){
            console.log(error);
            toast.error(error?.response?.data?.message|| error?.response?.data?.password ||"Internal Server Error");
        } finally{
            setLoader(false);
        }
}


export const logOutUser=(navigate)=>(dispatch)=>{
    dispatch({type:"LOG_OUT"});

    localStorage.removeItem("auth");
    navigate("/login");
};


export const addUpdateUserAddress=(sendData,toast,addressId,setOpenAddressModal)=>async (dispatch,getState)=>{
    
    // const {user}=getState().auth;
    dispatch({type:"BUTTON_LOADER"});
    try{
            if (addressId) {
                await api.put(`/addresses/${addressId}`,sendData);
            } else {
                const{data}=await api.post("/addresses",sendData);
            }
            dispatch(getUserAddresses());
            toast.success("Address saved successfully")
            dispatch({type:"IS_SUCCESS"});
        } catch(error){
            console.log(error);
            toast.error(error?.response?.data?.message ||"Internal Server Error");
            dispatch({type:"IS_ERROR",payload:null})
        } finally{
            setOpenAddressModal(false);
        }
}


export const getUserAddresses=()=>async(dispatch)=>{
    try{
        dispatch({type:"IS_FETCHING"});
        const {data}=await api.get(`/user/addresses`);
        dispatch({type:"USER_ADDRESS",payload:data});
        dispatch({type:"IS_SUCCESS"});
    } catch(error){
        console.log(error);
        dispatch({
            type:"IS_ERROR",
            payload:error?.response?.data?.message || "Failed to fetch user's addresses",
        });
    }
}

export const selectedUserCheckOutAddress=(address)=>{
    localStorage.setItem("CHECKOUT_ADDRESS",JSON.stringify(address));

    return{
        type:"SELECT_CHECKOUT_ADDRESS",
        payload:address,
    }
}


export const deleteUserAddress=(toast,addressId,setOpenDeleteModal)=>async(dispatch,getState)=>{
    try{
        dispatch({type:"BUTTON_LOADER"});
        console.log(addressId)
        await api.delete(`/addresses/${addressId}`);
        dispatch(getUserAddresses());
        dispatch(clearCheckOutAddress());
        toast.success("Address deleted successfully")
    } catch(error){
        console.log(error);
        dispatch({
            type:"IS_ERROR",
            payload:error?.response?.data?.message || "Failed to delete user's addresses",
        });
    }finally{
        setOpenDeleteModal(false);
    }
}

export const clearCheckOutAddress=()=>{
    return {
        type:"REMOVE_CHECKOUT_ADDRESS",
    }
}



export const addPaymentMethod=(method)=>{
    return{
        type:"ADD_PAYMENT_METHOD",
        payload:method,
    }
}


export const createUserCart=(sendCartItems)=>async(dispatch,getState)=>{
    
    try{
        dispatch({type:"IS_FETCHING"});
        await api.post('/carts/create',sendCartItems);
        // update the info recieved from user cart from backend and update it in the localstorage
        await dispatch(getUserCart());

    } catch(error){
        console.log(error);
        dispatch({
            type:"IS_ERROR",
            payload:error?.response?.data?.message || "Failed to create cart items",
        });
    }
}


export const getUserCart=()=>async(dispatch,getState)=>{
    try{
        dispatch({type:"IS_FETCHING"});
        const {data} =await api.get('/carts/users/cart');
        // update the info recieved from user cart from backend and update it in the localstorage

        // Modify image URLs
        const updatedProducts = data.products.map(product => ({
            ...product,
            image: `${import.meta.env.VITE_BACK_END_URL}/images/${product.image}`
        }));
        dispatch({
            type:"GET_USER_CART_PRODUCTS",
            payload:updatedProducts,
            totalPrice:data.totalPrice,
            cartId:data.cartId
        })
        localStorage.setItem("cartItems",JSON.stringify(getState().carts.cart));
        dispatch({type:"IS_SUCCESS"});
        
    } catch(error){
        console.log(error);
        dispatch({
            type:"IS_ERROR",
            payload:error?.response?.data?.message || "Failed to fetch cart items",
        });
    }
}

export const createStripePaymentSecret
    =(totalPrice)=>async(dispatch,getState)=>{
        try{
            dispatch({type:"IS_FETCHING"});
            const{data}=await api.post("/order/stripe-client-secret",{
                "amount": Number(totalPrice)*100,
                "currency": "usd"
                });
            dispatch({type:"CLIENT_SECRET",payload:data});
            localStorage.setItem("client-secret",JSON.stringify(data));
            dispatch({type:"IS_SUCCESS"});
        } catch(error){
            console.log(error);
            toast.error(error?.response?.data?.message|| "Failed to create message Secret");
        }
}


export const stripePaymentConfirmation
    =(sendData,setErrorMessage,setLoading,toast)=>async(dispatch,getState)=>{
        try{
            // console.log(sendData);
            const response =await api.post("/order/users/payments/online",sendData);
            // console.log(response);
            if(response.data){
                localStorage.removeItem("CHECKOUT_ADDRESS");
                localStorage.removeItem("cartItems");
                localStorage.removeItem("client-secret");
                dispatch({type:"REMOVE_CLIENT_SECRET_ADDRESS"});
                dispatch({type:"CLEAR_CART"});
                toast.success("Order Accepted");
            } else{
                setErrorMessage("Payment Failed. Please try again.")
            }
        } catch(error){
            console.log(error);
            setErrorMessage("Payment Failed. Please try again.")
        }
}