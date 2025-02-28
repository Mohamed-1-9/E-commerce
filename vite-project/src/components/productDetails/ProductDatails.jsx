import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../loader/loader';
import axios from 'axios';
import { cart } from '../../context/addCart';

function ProductDatails(props) {
    const {addToCart}=useContext(cart)
    
    const{id}=useParams()
    function getProductDetails(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    }
const {isError,isLoading,data,error} =useQuery({
    queryKey :["productDetails",id],
    queryFn : getProductDetails
})
const product= data?.data.data

if(isLoading){
    return <div className='h-screen  flex justify-center items-center'>
    <Loader color="black"  width="100"/>
</div>
}
if(isError){
    return <h1>isError</h1>
}
    return (
        <div>
            <div className="container grid grid-cols-10 fa-2x fa-bold p-5">
                <div className='col-span-4'>
                    <img className='w-3/4' src={product.imageCover} alt={product.title} />
                </div>
                <div className=' mt-5 col-span-6'>
                    <h1>{product.title}</h1>
                    <h2>{product.description}</h2>
                    <h3>{product.price} $</h3>
                    <button onClick={()=>{
                        addToCart(product.id)
                    }} className='bg-green-400 py-2 w-full rounded-2xl mt-2 cursor-pointer'>Add to Cart</button>
                </div>
            </div>

        </div>
    );
}
export default ProductDatails

