import { ReactNode, useState } from "react";
import { useAuth } from "./AuthProvider";
import { Notyf } from "notyf";
import { Navigate } from "react-router-dom";
import Sidebar from "../pages/Sidebar";

export default function Protect({ children } : { children : ReactNode}){
    const authInfo = useAuth()
    const notify = new Notyf()

    const [open, setOpen] = useState(true)
    
    if(!authInfo.accept){
        notify.error('未登录或登录过期')
        return <Navigate to = '/login'/>
    }

    return (
        <>
            <Sidebar open = { open } setOpen = { setOpen }/>
            <div className={`transition-all duration-300 ${open ? 'ml-64' : 'ml-20'}`}>
                { children }
            </div>
        </>
    )
}