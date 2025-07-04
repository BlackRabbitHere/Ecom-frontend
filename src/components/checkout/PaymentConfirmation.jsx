import { Skeleton } from "@mui/material";
import { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useSearchParams } from "react-router-dom"
import { stripePaymentConfirmation } from "../../store/action";
import toast from "react-hot-toast";
import { MdArrowBack } from "react-icons/md";

const PaymentConfirmation = () => {

    const location=useLocation();
    const searchParams=new URLSearchParams(location.search);
    const [errorMessage,setErrorMessage]=useState("");
    const {cart}=useSelector((state)=>state.carts);
    const dispatch=useDispatch();
    const [loading,setLoading]=useState(false);

    const paymentIntent=searchParams.get("payment_intent");
    const clientSecret=searchParams.get("payment_intent_client_secret");;
    const redirectStatus=searchParams.get("redirect_status");
    const selectedUserCheckOutAddress=localStorage.getItem("CHECKOUT_ADDRESS")
        ? JSON.parse(localStorage.getItem("CHECKOUT_ADDRESS"))
        :[];

    useEffect(()=>{
        if(paymentIntent && clientSecret && redirectStatus && cart && cart?.length>0){
            const sendData={
            addressId: selectedUserCheckOutAddress.addressId,
            pgName: "Stripe",
            pgPaymentId: paymentIntent,
            pgStatus: "Success",
            pgResponseMessage: "Payment processed successfully"
            }
            // console.log(selectedUserCheckOutAddress);
            // console.log(sendData);

            dispatch(stripePaymentConfirmation(sendData,setErrorMessage,setLoading,toast))
        }
    },[paymentIntent,clientSecret,redirectStatus,cart])

  return (
    <div className="min-h-screen flex items-center justify-center">
        {loading?(
          <div className="max-w-xl mx-auto">
            <Skeleton/>
          </div>  
        ):(
            <div className="p-8 rounded-lg shadow-lg text-center max-w-md mx-auto border border-gray-200">
                <div className="text-green-500 mb-4 flex  justify-center">    
                    <FaCheckCircle size={64} />
                </div>
                <h2 className='text-3xl font-bold text-gray-800 mb-2'>Payment Successful!</h2>
                <p className="text-gray-600 mb-6">
                    Thank you for your purchase! Your payment was successful, and we’re
                    processing your order.
                </p>
                <Link 
                    to={"/"}
                    className="flex gap-2 items-center justify-center text-blue-500 hover:text-blue-600 transition">
                        <MdArrowBack size={24}/>
                        <span className="font-medium">Continue Shopping</span>
                    </Link>
            </div>
        )}
    </div>
  )
}

export default PaymentConfirmation