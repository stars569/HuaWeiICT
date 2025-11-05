import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../authentic/AuthProvider";
import { loginForm, loginResponse, User } from "../types/authtype";
import { loginAPI } from "../apis/user";
import errorHandle from "../utils/errorHandle";
import { Notyf } from "notyf";

export default function Login(){
    const navi = useNavigate()
    const notify = new Notyf()
    const auth = useAuth()

    function handleClick(){
        navi('/register')
    }

    async function onFinish(formdata: loginForm){
        try{
            const result: loginResponse = await loginAPI(formdata)
            const user: User = { username: formdata.username }
            auth.login(user, result.data.token)
            notify.success(result.data.message)
            navi('/')
        }
        catch(error){
            errorHandle(error)
        }
    }

    return (
        <div>
            <div>this is login</div><Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: '请输入用户名!' }]}
                >
                <Input />
                </Form.Item>

                <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: '请输入密码!' }]}
                >
                <Input.Password />
                </Form.Item>

                <Form.Item label={null}>
                <Button type="primary" htmlType="submit">
                    登录
                </Button>
                </Form.Item>
            </Form>
            <Button onClick = { handleClick }>Click to register</Button>
        </div>
    )
}