import { Form, Input, Button, Card } from 'antd'
import { basicResponse, basicData, registerForm } from '../types/authtype'
import { registerAPI } from '../apis/user'
import { Notyf } from 'notyf'
import { useNavigate } from 'react-router-dom'
import errorHandle from '../utils/errorHandle'
import { UserOutlined, LockOutlined } from '@ant-design/icons'

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
            errorHandle(error)
        }
    } 

    function handleClick(){
        navi('/login')
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">创建账户</h1>
                    <p className="text-gray-600">请输入以下信息以创建新账户</p>
                </div>
                
                <Card className="shadow-xl rounded-2xl border-0 transition-all duration-300 hover:shadow-2xl">
                    <div className="py-6">
                        <Form
                            name="register"
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
                                    注册
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </Card>
                
                <div className="text-center">
                    <p className="text-gray-600">
                        已有账户？{' '}
                        <Button 
                            type="link" 
                            onClick={handleClick}
                            className="text-blue-500 font-medium hover:text-blue-700 transition-colors duration-300"
                        >
                            点击登录
                        </Button>
                    </p>
                </div>
            </div>
        </div>
    )
}