import React, { useContext, useEffect } from 'react';
import { WishlistContext } from '../../context/Wishlist';

function WishListCom(props) {
    const {wishlistProducts,remove} = useContext(WishlistContext)
    
    return (
        <div >
            {
                wishlistProducts?wishlistProducts?.data.map((product)=>{

                    return (
                    <div key={product.id} className=' flex justify-evenly items-center  w-full mb-5'>
                        <div className='flex items-center'>
                        <div className='w-64'>
                            <img src={product.imageCover} className='w-full h-full' alt="" />
                        </div>
                        <div>
                            {product.price}$
                        </div>
                        </div>
                        <button onClick={()=>{
                            remove(product.id)
                        }} className='text-red-500 cursor-pointer hover:text-red-700 hover:underline'>
                            remove
                        </button>

                    </div>)
                }):<h1>no products in wishlist</h1>
            }
        </div>
    );
}

export default WishListCom;