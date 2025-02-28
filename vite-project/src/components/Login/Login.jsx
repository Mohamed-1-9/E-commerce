import React, { useContext, useState} from "react";
import { Link, useNavigate} from "react-router";
import { Button, Label, TextInput } from "flowbite-react";
import * as Yup from "yup";
import { useFormik} from "formik";
import axios from "axios";
import Loader from "../loader/loader";
import { tokencontext } from "../../context/authContext";
import { Input } from "postcss";
function Login() {
    const [isCliced , setIsClicked] = useState(false);
    const [isSuc , setIsSuc] = useState(false);
    const [isError, setIsError] = useState(false);
    const {auth, setAuth} = useContext(tokencontext)
    const loginFormik = useFormik(
        {
            initialValues: {
                email: "",
                password: "",
            },
            onSubmit: (values) => {
                postRegisterData(values);
                setAuth(true)
            },

            validationSchema: Yup.object().shape({
                email: Yup.string().required("Email is required").email("Email is invalid"),
                password : Yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
                
            })
        }
    )
    const navigate = useNavigate()
    async function postRegisterData(values){
        setIsClicked(true)
        await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin",values
        )
        .then((okay) => {
            localStorage.setItem("token",okay.data.token)
            setIsSuc(true)
            setTimeout(()=>{
                setIsSuc(false)
                navigate("/")
            },2000)
        })
        .catch((error) => {
            setIsError(error.response.data.message)
            setTimeout(() => {
                setIsError(null)
            }, 200);
            
        }
        
        )
        setIsClicked(false)
    }
    return (
        <>
            <div className="container mx-auto mt-10">
                <h2 className="text-2xl text-center fa-2xl mb-4">Log In</h2>
                {isSuc?<div class="p-2 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
                Login is sucsseful
                </div>:""}
                {isError?
                <div class="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                {isError}
                
                </div>
                :
                ""}
                <div className=" w-3/4 mx-auto p-2 bg-white rounded-lg">
                    <form onSubmit={loginFormik.handleSubmit} className="flex flex-col gap-4 shadow-blue-500">
                        <div>
                            <div className="">
                                <Label himlFor="email" value="Your email" />
                            </div>
                            <TextInput
                                value={loginFormik.values.email}
                                onChange={loginFormik.handleChange}
                                onBlur={loginFormik.handleBlur}
                                id="email"
                                type="email"
                                placeholder="write your email"
                                required
                                shadow
                            />
                        </div>
                        {loginFormik.touched.email && loginFormik.errors.email ?<div class="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                            {loginFormik.errors.email}
                        </div>:""}
                        
                        <div>
                            <div className="">
                                <Label himlFor="password" value="Password" />
                            </div>
                            <TextInput
                                value={loginFormik.values.password}
                                onInput={loginFormik.handleChange}
                                onBlur={loginFormik.handleBlur}
                                id="password"
                                type="password"
                                placeholder="write your password"
                                required
                                shadow
                            />
                        </div>
                        {loginFormik.touched.password && loginFormik.errors.password ? 
                        <div class="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                        {loginFormik.errors.password}
                        </div>
                        :""
                        }
                        <Button className="bg-emerald-600 text-white w-full hover:bg-emerald-500 transition rounded-2xl cursor-pointer" type="submit">
                            {!isCliced ? "submit" : <Loader key="register" color="#fff" width="20"/>}
                        </Button>
                    </form>
                    <Link to="/forgetPass" className="text-red-600 cursor-pointer hover:underline">Forget Password?</Link>
                </div>
            </div>
        </>
    );
}

export default Login;
