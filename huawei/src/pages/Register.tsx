import { Form, Input, Button } from 'antd'
import { basicResponse, data, registerForm } from '../types/authtype'
import { registerAPI } from '../apis/user'
import { Notyf } from 'notyf'
import { useNavigate } from 'react-router-dom'
import { AxiosError } from 'axios'

export default function Register(){

    const notify = new Notyf()

    const navi = useNavigate()

    async function onFinish(formdata: registerForm){
        try{
            const result: basicResponse = await registerAPI(formdata)
            notify.success(result.data.message)
            navi('/login')
        }
        catch(error){
            const axiosError = error as AxiosError
            if(!axiosError.response){
                notify.error('未响应')
            }
            else{
                const response = axiosError.response.data as data
                notify.error(response.message)
            }
        }
    } 

    function handleClick(){
        navi('/login')
    }

    return (
        <div>
            <div>this is register</div>
            <Form
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
                rules={[{ required: true, message: '请输入用户名 !' }]}
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
                    注册
                </Button>
                </Form.Item>
            </Form>
            <Button onClick = { handleClick }>click to login</Button>
        </div>
    )
}