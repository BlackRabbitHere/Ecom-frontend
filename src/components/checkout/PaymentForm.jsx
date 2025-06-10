import { Skeleton } from "@mui/material";
import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { useState } from "react";

const PaymentForm = ({clientSecret,totalPrice}) => {

    const stripe=useStripe();
    const elements=useElements();
    const isLoading = !clientSecret || !stripe || !elements;
    const [errorMessage,setErrorMessage]=useState("");

    const handleSubmit=async (e)=>{
         e.preventDefault();
         if (!stripe || !elements) {
            return;
        }
    };

    const paymentElementOptions={
        layout:"tabs",
    }

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4">
        <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
        {isLoading ?(
            <Skeleton/>
        ):(
            <>
            {clientSecret && <PaymentElement options={paymentElementOptions}/>}
            {errorMessage &&(
                <div className="text-red-500 mt-2">{errorMessage}</div>
            )}

            <button
                className='text-white w-full px-5 py-[10px] bg-black mt-2 rounded-md font-bold disabled:opacity-50 disabled:animate-pulse cursor-pointer'
                disabled={!stripe || isLoading}>
                    {!isLoading?`Pay $${Number(totalPrice).toFixed(2)}`
                        :"Processing"}
            </button>
            </>
        )}
    </form>
  )
}

export default PaymentForm