import React from 'react';
import { useNavigate,Navigate } from 'react-router-dom';

function Check({children}) {
    if(!localStorage.getItem('token')) {
        <Navigate to={'/login'}/>
    }
    return (
        <div>
            {children}
        </div>
    );
}

export default Check;