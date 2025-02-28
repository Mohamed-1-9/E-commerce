import { Label, TextInput,Button } from 'flowbite-react';
import { useFormik } from 'formik';
import React from 'react';
import * as Yup from "yup";
import axios from "axios";

function Reset(props) {
    const resetFormik = useFormik(
        {
            initialValues: {

                resetCode: "",

            },
            onSubmit: resetPassword

            ,

            validationSchema: Yup.object().shape({
                resetCode: Yup.string().required(" this required")
            })
        }
    )
    async function resetPassword(values) {
        await axios.post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode", {
            resetCode : values
        }
        ).then((res) => {
            setMessage(res)
            
        }).catch((error) => {
            console.log(error)
        })
    }
    return (
         <div className='w-1/2 mx-auto mt-10'>
                    <form className='w-full' onSubmit={resetFormik.handleSubmit}>
                        <div>
                            <div className="">
                                <Label htmlFor="resetCode" value="Your resetCode" />
                            </div>
                            <TextInput
                                value={resetFormik.values.resetCode}
                                onChange={resetFormik.handleChange}
                                onBlur={resetFormik.handleBlur}
                                id="resetCode"
                                type="text"
                                placeholder="write your resetCode"
                                required
                                shadow
                            />
                        </div>
                        {resetFormik.touched.resetCode && resetFormik.errors.resetCode ? <div class="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                            {resetFormik.errors.resetCode}
                        </div> : ""}
                        <div>
                            <Button type="submit" class="bg-blue-500 px-5 hover:bg-blue-700  text-white font-bold py-1 mt-3  rounded-2xl">
                                Submit
                            </Button></div>
                    </form>
                    
                </div>
    );
}

export default Reset;