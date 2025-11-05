import express from "express"
import { db } from "../database.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const userRouter = express.Router()

userRouter.post('/register', async (req, res) => {
    const data = req.body

    const newPassword = data.user.password
    const hashPassword = await bcrypt.hash(newPassword, 10)
    data.user.password = hashPassword

    try{
        const result = await db.createUser(data.user)
        res.status(200).json({ message: '注册成功'})
    }
    catch(error){
        console.log(error)
        res.status(500).json({ message: '用户名重复'})
    }
})

userRouter.post('/login', async (req, res) => {

    const user = req.body.user

    try{
        const result = await db.getUserByUsername(user.username)
        if(!result) return res.status(401).json({ message: '找不到用户'})

        const comp = await bcrypt.compare(user.password, result.password)
        if(!comp) return res.status(401).json({ message: '密码错误' })

        const token = jwt.sign(
            { id: result.id, username: result.username },
            "jwt",
            { expiresIn: '10h' }
        )

        return res.status(200).json({ message: '登录成功', token: token})
    }
    catch(error){
        console.log('登录失败', error)
        return res.status(500).json({ message: '登录失败' })
    }
})

export default userRouter