import jwt from 'jsonwebtoken'

export default function auth(req, res, next){
    const header = req.headers['authorization']
    const jwtToken = header && header.split(' ')[1]

    if(!jwtToken) return res.status(401).json('未提供令牌')
    jwt.verify(jwtToken, 'jwt', (user, error) => {
        if(error) return res.status(401).json({ message: '登录过期' })
        req.user = user
        next()
    })
}