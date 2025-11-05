import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../authentic/AuthProvider";

export default function Home(){
    const navi = useNavigate()
    const auth = useAuth()
    function handleBackClick(){
        navi('/login')
    }

    function handleTokenClick(){
        console.log(auth.token)
    }

    return (
        <div>
            <div>this is home</div>
            <Button onClick = { handleTokenClick }>Click to see token</Button>
            <Button onClick = { handleBackClick }>Click to Login</Button>
        </div>
    )
}