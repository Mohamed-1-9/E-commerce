import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import  { tokencontext } from '../../context/authContext';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Loader from '../loader/loader';

function AllOrders(props) {
    const {auth,userId,jwt}=useContext(tokencontext)
            jwt()
    

    
    

    
        async function userOrders(){
            return axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`)
        }
    
    if(userId){
        var {data,isLoading,isError,error}=useQuery({
            queryKey: ["orders"],
            
            queryFn: userOrders
    })
    }
const orders=data
if(isLoading){
    return <div className='h-screen  flex justify-center items-center'>
        <Loader color="black"  width="100"/>
    </div>
}
if(isError){
    <Navigate to={'/home'}/>

    toast.error("there is error",{
        position:'top-right'
    })

}


    return (
        <div className='container mx-auto'>
            <h1 className='text-3xl text-center font-bold'>All Orders</h1>
                    <div className='grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-1 gap-4'>
                    {orders?.data.map((order)=>{
                        return <div className=' bg-blue-50 mt-5 rounded-2xl p-4' key={order.id}>
                        <p>Order id : {order.id}</p>
                        <p> totalOrderPrice
                        : {order.totalOrderPrice
                        }</p>
                        
                        <p>createdAt : {order.createdAt}
                        </p>
                        

                    </div>
                    })}
                    </div>
        </div>
    );
}

export default AllOrders;