import axios from 'axios';
import { Button, Label, TextInput } from 'flowbite-react';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup"
function ForgetPass(props) {
    const [message, setMessage] = useState("")
    const navigate =  useNavigate()
    const forgetFormik = useFormik(
        {
            initialValues: {

                email: "",

            },
            onSubmit: forgetPassword

            ,

            validationSchema: Yup.object().shape({
                email: Yup.string().required("Email is required").email("Email is invalid"),
            })
        }
    )
    async function forgetPassword(values) {
        await axios.post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", {
            email : values.email
        }
        ).then((res) => {
            setMessage(res.data.message)
            setTimeout(() => {
                navigate("/resetPassword")
            }, 200);
        }).catch((error) => {
            console.log(error)
        })
    }
    return (
        <div className='w-1/2 mx-auto mt-10'>
            <form className='w-full' onSubmit={forgetFormik.handleSubmit}>
                <div>
                    <div className="">
                        <Label htmlFor="email" value="Your email" />
                    </div>
                    <TextInput
                        value={forgetFormik.values.email}
                        onChange={forgetFormik.handleChange}
                        onBlur={forgetFormik.handleBlur}
                        id="email"
                        type="email"
                        placeholder="write your email"
                        required
                        shadow
                    />
                </div>
                {forgetFormik.touched.email && forgetFormik.errors.email ? <div class="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                    {forgetFormik.errors.email}
                </div> : ""}
                <div>
                    <Button type="submit" class="bg-blue-500 px-5 hover:bg-blue-700  text-white font-bold py-1 mt-3  rounded-2xl">
                        Submit
                    </Button></div>
            </form>
            {message ? <div class="p-2 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
                {message}
        </div>:""}
        </div>
    );
}

export default ForgetPass;