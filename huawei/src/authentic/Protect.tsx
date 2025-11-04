import { ReactNode } from "react";
import { useAuth } from "./AuthProvider";
import { Notyf } from "notyf";
import Login from "../pages/Login";
import { Navigate } from "react-router-dom";

export default function Protect({ children } : { children : ReactNode}){
    const authInfo = useAuth()
    const notify = new Notyf()
    
    if(!authInfo.accept){
        notify.error('未登录或登录过期')
        return <Navigate to = '/login'/>
    }

    return (
        <>
            { children }
        </>
    )
}