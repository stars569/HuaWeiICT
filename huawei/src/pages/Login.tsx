import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../authentic/AuthProvider";

export default function Login(){
    const navi = useNavigate()

    const auth = useAuth()

    function handleClick(){
        navi('/register')
    }

    return (
        <div>
            <div>this is login</div>
            <Button onClick = { handleClick }>Click to register</Button>
        </div>
    )
}