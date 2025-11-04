import express from "express"
import { db } from "../database.js"
import bcrypt from 'bcrypt'

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

export default userRouter