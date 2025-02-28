import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { tokencontext } from './authContext';


export const cart =createContext()
function AddCartProvider({children}) {


    const {auth}=useContext(tokencontext)


    const [totalCartPrice,setTotalCartPrice] =useState(0)
    const [numOfCartItems,setNumOfCartItems] =useState(0)
    const [products,setProducts] =useState(null)
    const [cartId,setCartId] = useState(null)
    


    
    async function addToCart(id){
        axios.post("https://ecommerce.routemisr.com/api/v1/cart",{
            
                "productId": id
            
        },
        {
            headers :{
                token :localStorage.getItem("token")
            }
        })
        .then(()=>{
            getCart()            
            toast.success("the product added",{
                position:"top-right"})
        })
        .catch(()=>{
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
    }
    function getCart(){
        axios.get("https://ecommerce.routemisr.com/api/v1/cart",{
            headers : {token:auth}
        }).then((result)=>{
            // console.log(result);
            setCartId(result.data.cartId)
            setProducts(result.data.data.products)
            setNumOfCartItems(result.data.numOfCartItems)
            setTotalCartPrice(result.data.data.totalCartPrice)
            
            
        })
    }
    async function updataCount(id,Newcount){
        axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
            count :  Newcount
        },{headers:{
            token : auth
        }})
        .then((result)=>{

            setProducts(result.data.data.products)
            setNumOfCartItems(result.data.numOfCartItems)
            setTotalCartPrice(result.data.data.totalCartPrice)
            
        })
        .catch((res)=>{
            toast.error("there is error",{
                position:"top-right"})
        })}
        async function deleteProduct(id){
            axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
                headers : {token:auth}
            }).then((result)=>{
                
                setProducts(result.data.data.products)
                setNumOfCartItems(result.data.numOfCartItems)
                setTotalCartPrice(result.data.data.totalCartPrice)
            }).catch((err)=>{
                
                
                toast.error("there is error",{
                    position:"top-right"    })
            })
        
        
        
    }
    async function deleteCart(){
        axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,{
            headers : {token:auth}
        }).then((result)=>{
            setProducts(null)
            setNumOfCartItems(0)
            setTotalCartPrice(0)
        }).catch((err)=>{
            console.log(err);
            toast.error("there is error",{
                position:"top-right"})
        })
    
    
    
}
    useEffect(()=>{
        if(auth){
            getCart()
        }
    },[auth])
    

    return (
        <cart.Provider value={{
            addToCart,
            products,
            numOfCartItems,
            totalCartPrice,getCart,updataCount,deleteProduct,deleteCart,cartId
            }}
            >
            {children}
        </cart.Provider>
    );
}

export default AddCartProvider;