import React, { useContext } from 'react';
import logo from "../../assets/images/freshcart-logo.svg"
import { Link, NavLink, useNavigate } from 'react-router-dom';

import {tokencontext} from '../../context/authContext';
import { cart } from '../../context/addCart';
import { WishlistContext } from '../../context/Wishlist';



function Navbar(props) {
      const {wishlistProducts} = useContext(WishlistContext)
  
  const {auth,setAuth}=useContext(tokencontext);
  const navigate = useNavigate()
  const {numOfCartItems,products}=useContext(cart)
    return (
    
            

<nav className="border-gray-200  bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <div className='flex justify-between gap-2 fa-4'>
    <NavLink to="/" className="flex items-center  space-x-3 rtl:space-x-reverse">
        <img src={logo} className="h-8" alt="Flowbite Logo" />
    </NavLink>
    <h3  className='mt-3'>
          <NavLink to="/home" className="hover:text-green-700 transition" aria-current="page">Home</NavLink>
    </h3>
    {auth ? <h3 className='mt-3'>
          <NavLink to="/products" className="hover:text-green-700 transition" aria-current="page">products</NavLink>
    </h3>:""}
    {auth ? <h3 className='mt-3'>
          <NavLink to="/category" className="hover:text-green-700 transition" aria-current="page">category</NavLink>
    </h3>:""}
    {auth ? <h3 className='mt-3'>
          <NavLink to="/cart" className="hover:text-green-700 transition" aria-current="page">Cart</NavLink>
    </h3>:""}
    {auth ? <h3 className='mt-3'>
          <NavLink to="/allOrders" className="hover:text-green-700 transition" aria-current="page">Orders</NavLink>
    </h3>:""}
    
    
    <div data-collapse-toggle="navbar-solid-bg" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-solid-bg" aria-expanded="false">
        <span className="sr-only">Open main menu</span>
        <svg className="w-5   h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </div>
    </div>
    <div className="hidden w-full md:block md:w-auto" id="navbar-solid-bg">
      <ul className="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
        {auth?
        <li className='relative'>
          <Link to={"/cart"}><i class="fa-solid fa-cart-shopping"></i></Link>
          {products?.length?<h6 className='text-white bg-green-700  w-4 rounded-2xl flex justify-center items-center h-4 absolute -top-2 -right-2
          '>{numOfCartItems}</h6>:""}
        </li>
        :""}
        {auth?
        <li className='relative'>
          <Link to={"/wishList"}><i class="fa-solid fa-heart"></i></Link>
          {wishlistProducts?.data?<h6 className='text-white bg-red-700  w-4 rounded-2xl flex justify-center items-center h-4 absolute -top-2 -right-2
          '>{wishlistProducts.count}</h6>:""}
        </li>
        :""}
        <li>
          <i className="fa-brands fa-facebook"></i>
        </li>
        
        <li>
          <i className="fa-brands fa-youtube"></i>
        </li>
        <li>
          <i className="fa-brands fa-instagram"></i>
        </li>
        <li>
          <i className="fa-brands fa-linkedin"></i>
        </li>
        <li>
          <i className="fa-brands fa-twitter"></i>
        </li>
        
        {!auth ? <><li>
          <NavLink to="/register" className="" aria-current="page">Register</NavLink>
        </li>
        <li>
          <NavLink to="/login" className="" aria-current="page">Login</NavLink>
        </li></>:""}
        {auth ? <li>
          <button onClick={()=>{
            localStorage.removeItem("token");
            setAuth(null);
            navigate("login")
          }} className="" aria-current="page">Log out</button>
        </li>:""}
        
      </ul>
    </div>
  </div>
</nav>

        
    );
}

export default Navbar;