import { useForm } from "react-hook-form";
import { AiOutlineLogin } from "react-icons/ai";
import InputField from "../shared/InputField";
import Spinners from "../shared/Spinners";
import { FaAddressCard } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { addUpdateUserAddress } from "../../store/action";

const AddAddressForm=({address,setOpenAd,setOpenAddressModal})=>{

    const {btnLoader}=useSelector((state)=>state.errors)
    const dispatch=useDispatch();
    const {
            register,
            handleSubmit,
            reset,
            formState:{errors},
        }=useForm({
            mode:"onTouched",
        })
        
        const onSaveAddressHandler=async (data)=>{
            // console.log("Address Clicked");
            // dispatch(authenticateSignInUser(data,toast,reset,navigate,setLoader))
            dispatch(addUpdateUserAddress(data,toast,address?.addressId,setOpenAddressModal))
        }

    return(
        <div className="">
            <form 
                onSubmit={handleSubmit(onSaveAddressHandler)}
                className="">
                    <div className="flex justify-center items-center mb-4 font-semibold text-2xl text-slate-800 py-2 px-4">
                        <FaAddressCard className="mr-2 text-2xl"/>
                        Add Address
                    </div>
                
                <div className="flex flex-col gap-4">
                    {/* All the input fields */}
                    <InputField
                        label="Building Name"
                        required
                        id="buildingName"
                        type="text"
                        message="*Building is Required"
                        placeholder="Enter your building"
                        register={register}
                        errors={errors}/>
                    <InputField
                        label="City"
                        required
                        id="city"
                        type="text"
                        message="*City is Required"
                        placeholder="Enter your city"
                        register={register}
                        errors={errors}/>
                    <InputField
                        label="State"
                        required
                        id="state"
                        type="text"
                        message="*State is Required"
                        placeholder="Enter your State"
                        register={register}
                        errors={errors}/>
                    <InputField
                        label="Pincode"
                        required
                        id="pincode"
                        type="text"
                        message="*Pincode is Required"
                        placeholder="Enter Pincode"
                        register={register}
                        errors={errors}/>
                    <InputField
                        label="Street"
                        required
                        id="street"
                        type="text"
                        message="*Street is Required"
                        placeholder="Enter Street name"
                        register={register}
                        errors={errors}/>
                    <InputField
                        label="Country"
                        required
                        id="country"
                        type="text"
                        message="*Country is Required"
                        placeholder="Enter Country name"
                        register={register}
                        errors={errors}/>
                </div>
                <button disabled={btnLoader}
                    className="text-white bg-blue-500 px-4 py-2 rounded-md mt-4"
                    type="submit">
                        {btnLoader?(
                            <><Spinners/>Loading... </>
                            
                        ): (
                            <>Save</>
                        )}
                        
                </button>
                
            </form>
        </div>
    )
}

export default AddAddressForm;