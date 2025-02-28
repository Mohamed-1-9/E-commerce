import React, { useContext } from 'react';
import SimpleSlider from '../slider/slider';
import axios, { all } from "axios";
import {useQuery} from "@tanstack/react-query"
import Loader from '../loader/loader';
import useCategories from "../../customHooks/Categories.js"
import Slider from 'react-slick';
import Category from '../category/Category.jsx';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { cart } from '../../context/addCart.jsx';
import toast from 'react-hot-toast';
import { WishlistContext } from '../../context/Wishlist.jsx';

function Home() {
    const{addToCart}=useContext(cart)
    function getData(){
        return axios.get("https://ecommerce.routemisr.com/api/v1/products")
    }
    const {data,isError,isLoading} =useQuery({
        queryKey:"getAllData",
        queryFn : getData
        
    })
    
    
    
    if(isError){
        toast.error("there is error",{
            position:'top-right'
        })

    }
    const allProducts = data?.data.data
    if(isLoading){
        return <div className='h-screen  flex justify-center items-center'>
            <Loader color="black"  width="100"/>
        </div>
    }
    const {addToWishlist,getWishlist} = useContext(WishlistContext);
    return (
        <div className='text-black-950 bg-blue-50'>
            <SimpleSlider/>
            <div className='flex'>
            </div>
            <div className='gap-3 mt-14 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6'>
                {allProducts.map((product) => {
                    return <Link to={`/productDetails/${product._id}`} className='group relative cursor-pointer bg-blue-100 rounded-xl overflow-hidden' key={product._id}>
                        <img className='w-full h-64' src={product.imageCover} alt={product.name} />
                        <h2 className='ps-3 pb-0'>{product.title}</h2>
                        <h3 className='ps-3 pb-0'>{product.name}</h3>
                        <h4 className='ps-3 pb-0'>{product.price}$</h4>
                        <button onClick={(e)=>{
                            e.preventDefault()
                            addToCart(product._id)
                        }} className='bg-green-600 text-white translate-x-[150%] cursor-pointer transition duration-300 group-hover:translate-0 w-10 h-10 absolute top-2 rounded right-2'>+
                        </button>
                        <button onClick={(e)=>{
                            e.preventDefault()
                            addToWishlist(product._id)
                            getWishlist()
                            
                        }} className='bg-red-600 text-white  -translate-x-[150%] cursor-pointer transition duration-300 group-hover:translate-0 w-10 h-10 absolute top-2 start-2 rounded left-2'>+
                        </button>
                    </Link>
                })}
            </div>

        </div>
    );
}

export default Home;