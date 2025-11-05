import { Button, Card, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../authentic/AuthProvider";
import { loginForm, loginResponse, User } from "../types/authtype";
import { loginAPI } from "../apis/user";
import errorHandle from "../utils/errorHandle";
import { Notyf } from "notyf";
import { UserOutlined, LockOutlined } from '@ant-design/icons'

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
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">欢迎回来</h1>
                    <p className="text-gray-600">请输入您的账户信息以继续</p>
                </div>
                
                <Card className="shadow-xl rounded-2xl border-0 transition-all duration-300 hover:shadow-2xl">
                    <div className="py-6">
                        <Form
                            name="login"
                            layout="vertical"
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            autoComplete="off"
                        >
                            <Form.Item
                                label={<span className="font-medium text-gray-700">用户名</span>}
                                name="username"
                                rules={[{ required: true, message: '请输入用户名!' }]}
                            >
                                <Input 
                                    prefix={ <UserOutlined /> }
                                    size="large" 
                                    placeholder="请输入用户名"
                                    className="rounded-lg py-3 px-4"
                                />
                            </Form.Item>

                            <Form.Item
                                label={<span className="font-medium text-gray-700">密码</span>}
                                name="password"
                                rules={[{ required: true, message: '请输入密码!' }]}
                            >
                                <Input.Password 
                                    prefix={ <LockOutlined /> }
                                    size="large" 
                                    placeholder="请输入密码"
                                    className="rounded-lg py-3 px-4"
                                />
                            </Form.Item>

                            <Form.Item>
                                <Button 
                                    type="primary" 
                                    htmlType="submit" 
                                    size="large"
                                    className="w-full h-12 bg-gradient-to-r from-blue-500 to-indigo-600 border-0 rounded-lg font-semibold text-lg shadow-md hover:shadow-lg transition-all duration-300"
                                >
                                    登录
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </Card>
                
                <div className="text-center">
                    <p className="text-gray-600">
                        还没有账户？
                        <Button 
                            type="link" 
                            onClick={handleClick}
                            className="text-blue-500 font-medium hover:text-blue-700 transition-colors duration-300"
                        >
                            点击注册
                        </Button>
                    </p>
                </div>
            </div>
        </div>
    )
}