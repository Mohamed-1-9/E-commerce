import React, { useContext, useEffect, useState } from 'react';
import { cart } from '../../context/addCart';
import { tokencontext } from '../../context/authContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';


function Cart() {
    
    const {products,numOfCartItems,totalCartPrice,updataCount,deleteProduct,deleteCart}=useContext(cart)
    
    
    
    return (
        

<div class="relative overflow-x-auto shadow-md sm:rounded-lg min-h-screen ">
    <table class=" text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 flex flex-col ">
        <h2 className='ms-5'>Total price : {totalCartPrice}</h2>
        {products?.length?<button onClick={deleteCart} className='btn ms-5 my-4 bg-red-500 rounded-2xl cursor-pointer p-4 text-white w-fit '>clear cart</button>:""}
        <tbody className=''>
            {products?.length?products?.map((product)=>{
                return (<tr key={product.id} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td class="p-4">
                        <img src={product.product.imageCover} class="w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch"/>
                    </td>
                    <td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                        {product.product.title}
                    </td>
                    <td class="px-6 py-4">
                        <div class="flex items-center">
                            <button onClick={()=>{
                                updataCount(product.product._id,product.count-1)
                            }} class="inline-flex  items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                                <span class="sr-only">Quantity button</span>
                                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16"/>
                                </svg>
                            </button>
                            <div>
                                <input type="tel" value={product.count} id="first_product" class="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="1" required />
                            </div>
                            <button onClick={()=>{
                                updataCount(product.product._id,product.count+1)
                            }} class="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                                <span class="sr-only">Quantity button</span>
                                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
                                </svg>
                            </button>
                        </div>
                    </td>
                    <td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {product.price} EG
                    </td>
                    <td class="px-6 py-4">
                        <a onClick={()=>{
                            deleteProduct(product.product._id)
                        }} class="font-medium cursor-pointer text-red-600 dark:text-red-500 hover:underline">Remove</a>
                    </td>
                </tr>)
            }):<h1 className='ms-5'>no products in the cart</h1>
            }
            
        </tbody>
    </table>
    {products?.length?<div className='text-center'>
    <Link to="cashOrder" >
        <button  className='p-3 w-1/2 bg-green-700 text-white cursor-pointer rounded-2xl'>Pay your Products</button>
    </Link>
    </div>:""}
</div>

    );
}

export default  Cart;