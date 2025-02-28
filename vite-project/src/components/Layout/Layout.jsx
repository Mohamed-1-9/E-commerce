import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../navbar/Navbar';
import Check from '../../context/Check';

function Layout(props) {
    return (
        <div > 
            <Navbar/>
            <Check>
            <Outlet />
            </Check>
            
        </div>
    );
}

export default Layout;