import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaUserPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../shared/InputField";
import { registerNewUser } from "../../store/action";
import toast from "react-hot-toast";
import Spinners from "../shared/Spinners";
import { AiFillEye, AiFillEyeInvisible, AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";


const Register = () => {
  const navigate=useNavigate();
    const dispatch=useDispatch();
    const [loader,setLoader]=useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState:{errors},
    }=useForm({
        mode:"onTouched",
    })

    const registerHandler=async (data)=>{
        console.log("Register Clicked");
        dispatch(registerNewUser(data,toast,reset,navigate,setLoader));
        
    }

    return(
        <div className="min-h-[calc(100vh-64px)] flex justify-center items-center">
            <form 
                onSubmit={handleSubmit(registerHandler)}
                className="sm:w-[450px] w-[360px] shadow-[0_0_15px_rgba(0,0,0,0.3)] py-8 sm:px-8 px-4 rounded-md">
                    <div className="flex flex-col items-center justify-center space-y-4">
                        <FaUserPlus className="text-slate-800 text-5xl"/>
                        <h1 className="text-slate-800 text-center text-2xl font-bold">Register Here</h1>
                    </div>
                <hr className="mt-2 mb-5 text-gray-300"/>
                <div className="flex flex-col gap-3">
                    {/* All the input fields */}
                    <InputField
                        label="UserName"
                        required
                        id="username"
                        type="text"
                        message="*Username is Required"
                        placeholder="Enter your username"
                        register={register}
                        errors={errors}/>
                    <InputField
                        label="Email"
                        required
                        id="email"
                        type="email"
                        message="*Email is Required"
                        placeholder="Enter your email"
                        register={register}
                        errors={errors}/>
                    <div className="relative">
                    <InputField
                        label="Password"
                        required
                        id="password"
                        min={6}
                        type={showPassword ? "text" : "password"}
                        message="*Password is Required"
                        placeholder="Enter your password"
                        register={register}
                        errors={errors}/>
                        <span
                            className="absolute right-3 top-[38px] cursor-pointer text-gray-600"
                            onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}

                            </span>
                        </div>
                </div>
                <button disabled={loader}
                    className="bg-gradient-to-r from-purple-700 to-red-500 flex gap-2 items-center justify-center font-semibold text-white w-full py-2 hover:text-slate-400 transition-colors duration-100 rounded-sm my-3 cursor-pointer"
                    type="submit">
                        {loader?(
                            <><Spinners/>Loading... </>
                            
                        ): (
                            <>Register</>
                        )}
                        
                </button>
                <p className="text-center text-sm text-slate-700 mt-6">
                    Already have an account?
                    <Link 
                        className="font-semibold underline hover:text-black"
                        to="/login">
                        <span> Login</span>
                    </Link>
                </p>
            </form>
        </div>
    )
}

export default Register