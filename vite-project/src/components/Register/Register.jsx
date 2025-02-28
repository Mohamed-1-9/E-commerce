import React, { useState} from "react";
import { Link, useNavigate} from "react-router";
import { Button, Label,  TextInput, } from "flowbite-react";
import * as Yup from "yup";
import { useFormik} from "formik";
import axios from "axios";
import Loader from "../loader/loader";
function Register() {
    const [isCliced , setIsClicked] = useState(false);
    const [isSuc , setIsSuc] = useState(false);
    const [isError, setIsError] = useState(false);
    const RegisterFormik = useFormik(
        {
            initialValues: {
                name: "",
                phone: "",
                email: "",
                password: "",
                rePassword: "",
            },
            onSubmit: (values) => {
                
                    postRegisterData(values);
                
            },

            validationSchema: Yup.object().shape({
                name: Yup.string().required("").max(15, "Name must be at most 15 characters").matches(/^[a-z0-9_-]{3,15}$/, "Name is invalid"),
                email: Yup.string().required("Email is required").email("Email is invalid"),
                password : Yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
                phone : Yup.string().required().matches(/^01[1250][0-9]{8}$/, "Phone is invalid"),
                rePassword: Yup.string().required("Confirm password is required").oneOf([Yup.ref("password")], "Password and confirm password must be the same")
            })
        }
    )
    const navigate = useNavigate()
    async function postRegisterData(values){
        setIsClicked(true)
        await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup",values
        ).then(() => {
            setIsSuc(true)
            setTimeout(()=>{
                setIsSuc(false)
                navigate("/login")
            },2000)
        }).catch((error) => {
            setIsError(error.response.data.message)
            setTimeout(() => {
                setIsError(null)
            }, 2500);
            
        }
        
        )
        setIsClicked(false)
    }
    return (
        <>
            <div className="container ms-[30px] mx-auto mt-10">
                <h1 className="text-2xl  fa-2xl mb-5">Register : </h1>
                {isSuc?<div class="p-2 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
                Registeration is sucsseful
                </div>:""}
                {isError?
                <div class="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                {isError}
                
                </div>
                :
                ""}
                <div className=" w-3/4  p-2 bg-white rounded-lg">
                    <form onSubmit={RegisterFormik.handleSubmit} className="flex flex-col gap-4  shadow-blue-500">
                        <div>
                            <div className="">
                                <Label htmlFor="name" value="Name :" />
                            </div>
                            <TextInput
                                value={RegisterFormik.values.name}
                                onChange={RegisterFormik.handleChange}
                                onBlur={RegisterFormik.handleBlur}
                                id="name"
                                type="text"
                                placeholder="write your name"
                                required
                                shadow
                            />
                        </div>
                        {RegisterFormik.touched.name && RegisterFormik.errors.name ? 
                        <div class="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                        {RegisterFormik.errors.name}
                        </div>
                        :""
                        }
                        
                        <div>
                            <div className="">
                                <Label htmlFor="email" value="Your email" />
                            </div>
                            <TextInput
                                value={RegisterFormik.values.email}
                                onChange={RegisterFormik.handleChange}
                                onBlur={RegisterFormik.handleBlur}
                                id="email"
                                type="email"
                                placeholder="write your email"
                                required
                                shadow
                            />
                        </div>
                        {RegisterFormik.touched.email && RegisterFormik.errors.email ?<div class="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                            {RegisterFormik.errors.email}
                        </div>:""}
                        <div>
                            <div className="">
                                <Label htmlFor="phone" value="Your phone" />
                            </div>
                            <TextInput
                                value={RegisterFormik.values.phone}
                                onChange={RegisterFormik.handleChange}
                                onBlur={RegisterFormik.handleBlur}
                                id="phone"
                                type="tel"
                                placeholder="write your phone number"
                                required
                                shadow
                            />
                        </div>
                        {RegisterFormik.touched.phone && RegisterFormik.errors.phone ? 
                        <div class="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                        {RegisterFormik.errors.phone}
                        </div>
                        :""
                        }
                        <div>
                            <div className="">
                                <Label htmlFor="password" value="Password" />
                            </div>
                            <TextInput
                                value={RegisterFormik.values.password}
                                onInput={RegisterFormik.handleChange}
                                onBlur={RegisterFormik.handleBlur}
                                id="password"
                                type="password"
                                placeholder="write your password"
                                required
                                shadow
                            />
                        </div>
                        {RegisterFormik.touched.password && RegisterFormik.errors.password ? 
                        <div class="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                        {RegisterFormik.errors.password}
                        </div>
                        :""
                        }
                        <div>
                            <div className="">
                                <Label htmlFor="rePassword" value="confirm Password" />
                            </div>
                            <TextInput
                                value={RegisterFormik.values.rePassword}
                                onChange={RegisterFormik.handleChange}
                                onBlur={RegisterFormik.handleBlur}
                                id="rePassword"
                                type="password"
                                placeholder="confirm password"
                                required
                                shadow
                            />
                        </div>
                        {RegisterFormik.touched.rePassword && RegisterFormik.errors.rePassword ? 
                        <div class="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                        {RegisterFormik.errors.rePassword}
                        </div>
                        :""
                        }
                        <Button className="bg-emerald-600 cursor-pointer" type="submit">
                            {!isCliced ? "submit" : <Loader key="register" color="#fff" width="20"/>}
                        </Button>
                    </form>
                    
                </div>

            </div>
        </>
    );
}

export default Register;