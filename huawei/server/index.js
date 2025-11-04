import express from 'express'
import cors from 'cors'
import { initDB } from './database.js'
import userRouter from './routes/userOperation.js'

const app = express()

initDB().catch(error => {
    console.log('数据库初始化失败', error)
})

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/server', userRouter)

app.listen(8080, () => {
    console.log('server is running on port 8080')
})