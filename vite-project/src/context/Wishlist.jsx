import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { tokencontext } from './authContext';
import toast from 'react-hot-toast';
import { useQueries, useQuery } from '@tanstack/react-query';
export const WishlistContext = createContext();

function Wishlist({children}) {
    const [wishlistProducts,setWishlistProducts]=useState(null)
    const{auth}=useContext(tokencontext)
    async function addToWishlist(id) {
       
            axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`, {

                productId: id
            },{
                headers: {
                    token : localStorage.getItem("token"),
                },
            }).then(()=>{
                
                toast.success("product added to wishlist",{
                    position:'top-left'
                })
            }).catch(()=>{
                if(!auth){
                    toast.error("please login first",{
                        position:"top-right"})
                    
                }
                else{
                    toast.error("there is error !!!",{
                        position:"top-right"    })
                    toast.error("please login first",{
                        position:"top-right"    })
                }
                
            })
            getWishlist()
        
    }
    async function getWishlist(){

    await axios.get("https://ecommerce.routemisr.com/api/v1/wishlist" , {
        headers:{
            token : localStorage.getItem("token")
        }
    }).then((res)=>{
        setWishlistProducts(res.data)
        
    }).catch((err)=>{
        console.log(err);
        
        toast.error("there is error from",{
            position:'top-left'
        })
    })
   
    }
    async function remove(id) {
        axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,{
            headers:{
                token: localStorage.getItem("token")
            }
        }).then((res)=>{
            setWishlistProducts(res.data)
        }).catch((err)=>{
            toast.error("there is error",{
                position:'top-left'
            })
        })
        
    }
    useEffect(()=>{
        getWishlist()
    },[wishlistProducts])

    
    
    
    
    
    














    return (
        <WishlistContext.Provider value={{addToWishlist,wishlistProducts,remove}}>
            {children}
        </WishlistContext.Provider>
    );
}

export default Wishlist;