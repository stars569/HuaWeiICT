import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { authInfo, User } from "../types/authtype";
import Login from "../pages/Login";

const AuthInfo = createContext<undefined | authInfo>(undefined)

export default function Auth({ children }: { children: ReactNode }){
    const [user, setUser] = useState<null | User>(null)
    const [token, setToken] = useState<null | string>(null)

    useEffect(() => {
        async function loadInfo(){
            const localUser = await localStorage.getItem('USER')
            const localToken = await localStorage.getItem('TOKEN')

            if(localUser == null || localUser == undefined)setUser(null)
            else setUser(JSON.parse(localUser))

            if(localToken == null || localToken == undefined)setToken(null)
            else setToken(localToken)
        }
        loadInfo()
    }, [])

    async function login(User: User, Token: string){
        localStorage.setItem('USER', JSON.stringify(user))
        localStorage.setItem('TOKEN', JSON.stringify(Token))

        setUser(User)
        setToken(Token)
    }

    async function logout(){
        localStorage.removeItem('USER')
        localStorage.removeItem('TOKEN')
    }

    const infos = {
        user,
        token,
        login,
        logout,
        accept: !!user && !!token
    }

    return <AuthInfo.Provider value = { infos }>{ children }</AuthInfo.Provider>
}

export function useAuth(){
    const authInfo = useContext(AuthInfo)
    if(authInfo === null || authInfo === undefined){
        throw new Error('useAuth只能在Auth组件中使用')
    }
    return authInfo
}