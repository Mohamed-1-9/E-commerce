import React, { createContext, useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";

export const tokencontext = createContext();
function AuthContext({children}) {
    const [auth, setAuth] = useState(null);
    const [userId, setUserId] = useState(null);
    

    function jwt(){
            if(auth){
                const decode = jwtDecode(auth) 
            setUserId(decode.id)
            }
    }
    const token = localStorage.getItem("token")
    useEffect(()=> {

            setAuth(token)
        
    },[token])
    return (
        <tokencontext.Provider value={{auth, setAuth,userId,jwt}}>
            {children}
        </tokencontext.Provider>
    );
}

export default AuthContext;