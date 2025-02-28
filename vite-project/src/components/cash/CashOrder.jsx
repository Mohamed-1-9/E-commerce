import { Button , TextInput,Label} from 'flowbite-react';
import { useFormik } from 'formik';
import React, { useContext, useState } from 'react';
import * as Yup from "yup";
import Loader from '../loader/loader';
import { tokencontext } from '../../context/authContext';
import { cart } from '../../context/addCart';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function CashOrder(props) {
    const navigate= useNavigate()
    const [isCliced , setIsClicked] = useState(false);
    const {auth}=useContext(tokencontext)
    
    const {cartId,getCart}=useContext(cart)
    const [chackOutClicked,setCheckOutClicked] = useState(false)
    const orderForm = useFormik(
            {
                initialValues: {
                    details: "",
                    phone: "",
                    city: "",
                },
                
                onSubmit: (values)=>{
                    // if click on chackout btn
                    if(chackOutClicked){
                        
                        chackOut(values)
                    }else{
                        createCashOrder(values)
                        
                    }
                },
                
                validationSchema: Yup.object().shape({
                    details: Yup.string().required("details is required"),
                    phone : Yup.string().required("phone is required").matches(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/, "phone must be a number"),
                    city : Yup.string().required("city is required"),
                    
                })
            }
        )
        const chackOut= async (values)=>{
                
                    axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,{
                        shippingAddress:values
        
                    },{
                        headers:{
                            token:auth
                        },
                        params:{
                            url : "http://localhost:5173"
                        }
                    }).then((res)=>{
                        
                        window.open(res.data.session.url,"_self")
                        setCheckOutClicked(false)
                        
                    }).catch((err)=>{
                        c
                        toast.error("there is error in checkout",{
                            position:"top-right"
                        })
                    })
                
            
        }
        async function createCashOrder(values){
            setIsClicked(true)
            axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,{
                shippingAddress:values
        },{
                headers:{
                    token : auth
                }
            },
        ).then((res)=>{
            getCart()
            toast.success("the Order is Created successfully",{
                position:"top-right"
            })
            navigate("/home")

        }).catch((err)=>{
            toast.error("there is error",{
                position:"top-right"
            })
        })
        
        
        setIsClicked(false)
        }
    return (
        <div classname="w-full">
            <form onSubmit={orderForm.handleSubmit} className="flex  w-full flex-col gap-4 shadow-blue-500">
                        <div>
                            <div className="">
                                <Label himlFor="details" value="Your details" />
                            </div>
                            <TextInput
                                value={orderForm.values.details}
                                onChange={orderForm.handleChange}
                                onBlur={orderForm.handleBlur}
                                id="details"
                                type="text"
                                placeholder="write your details"
                                required
                                shadow
                            />
                        </div>
                        {orderForm.touched.details && orderForm.errors.details ?<div class="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                            {orderForm.errors.details}
                        </div>:""}
                        
                        <div>
                            <div className="">
                                <Label himlFor="phone" value="phone" />
                            </div>
                            <TextInput
                                value={orderForm.values.phone}
                                onInput={orderForm.handleChange}
                                onBlur={orderForm.handleBlur}
                                id="phone"
                                type="phone"
                                placeholder="write your phone"
                                required
                                shadow
                            />
                        </div>
                        <div>
                            <div className="">
                                <Label himlFor="city" value="city" />
                            </div>
                            <TextInput
                                value={orderForm.values.city}
                                onInput={orderForm.handleChange}
                                onBlur={orderForm.handleBlur}
                                id="city"
                                type="text"
                                placeholder="write your city"
                                required
                                shadow
                            />
                        </div>
                        {orderForm.touched.city && orderForm.errors.city ? 
                        <div class="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                        {orderForm.errors.city}
                        </div>
                        :""
                        }
                        <Button className="bg-emerald-600 text-white w-4/5 self-center hover:bg-emerald-500 transition rounded-2xl cursor-pointer" type="submit">
                            {!isCliced ? "Order Now" : <Loader key="register" color="#fff" width="20"/>}
                        </Button>
                        <Button name='checkOut' onClick={()=>{
                            
                            setCheckOutClicked(true)
                        }} type='submit' className="bg-blue-600 text-white w-4/5 self-center hover:bg-blue-500 transition rounded-2xl cursor-pointer ">
                    {!isCliced ? "Check Out" : <Loader key="register" color="#fff" width="20"/>}

                    </Button>
                    </form>
                    


        </div>
    );
}

export default CashOrder;