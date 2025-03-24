import { useContext,createContext,useEffect,useState } from "react";
const authcontext=createContext(null);
export const useAuth=()=>useContext(authcontext);

export const AuthProvider=({children})=>{
    const [token,settoken]=useState(localStorage.getItem('token')||"");
    const [userType,setuserType]=useState(localStorage.getItem('userType')||"");
    useEffect(()=>{
        if(token) localStorage.setItem('token',token);
        if(userType) localStorage.setItem('userType',userType);
    },[token,userType]);
    const logout=()=>{
        settoken("");
        setuserType("");
        localStorage.removeItem('token');
        localStorage.removeItem('userType');
    }
    return(
        <authcontext.Provider value={{token,settoken,userType,setuserType,logout}}>
            {children}
        </authcontext.Provider>
    );
};