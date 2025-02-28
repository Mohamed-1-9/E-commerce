import React from 'react';
import Register from './components/Register/Register';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import NotFounded from './components/notFounded/notFounded';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Layout from './components/Layout/Layout';
import AuthContext from './context/authContext';
import Products from './components/products/products';
import Category from './components/category/Category';
import { QueryClient, QueryClientProvider} from '@tanstack/react-query'
import ProductDetails from './components/productDetails/ProductDatails';
import AddCartProvider from './context/addCart';
import Cart from './components/cart/cart';
import toast, { Toaster } from 'react-hot-toast';
import CashOrder from './components/cash/CashOrder';
import AllOrders from './components/allOrders/AllOrders';
import Wishlist from './context/Wishlist';
import WishListCom from './components/WishListCom/WishListCom';
import ForgetPass from './components/forget/ForgetPass';
import Reset from './components/rest/Reset';
function App() {
  const router = createBrowserRouter([
    {
      element: <Layout />,
      path : '/',
      children:
      [
        {
          element: <Home />,
          path: '/'
        },
        {
          element: <Cart />,
          path: '/cart'
        },
        {
          element: <ProductDetails />,
          path: '/productDetails/:id'
        },
        {
          element: <AllOrders />,
          path: '/allOrders'
        },
        {
          element: <Home />,
          path: '/home'
        },
        {
          element: <CashOrder />,
          path: 'cart/cashOrder'
        },
        {
          element: <Register />,
          path: '/register'
        },
        {
          element: <Category />,
          path: '/category'
        },
        {
          element: <Login />,
          path: '/login'
        },
        {
          element: <WishListCom />,
          path: '/wishList'
        },
        {
          element: <ForgetPass />,
          path: '/forgetPass'
        },
        {
          element: <Reset />,
          path: '/resetPassword'
        },
        {
          element: <NotFounded />,
          path: '*' // 404
        },
        
        {
          element: <Products/>,
          path: 'products' // 404
        }
        
      ]
    }
  ])
  
  let client = new QueryClient()
  return (
      <QueryClientProvider client={client}>
    <AuthContext>
      
      <AddCartProvider>
      <Wishlist>
      <RouterProvider router={router} />
      <Toaster/>
      </Wishlist>
      </AddCartProvider>
    </AuthContext>
    </QueryClientProvider>
  );
}

export default App;
