import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export const authenticateToken = () => {
    const authHeader = req.headers['access_token']
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) return { 'code': 'no_token_provided' }

    jwt.verify(token, process.env.TOKEN_SECERT).then(user => {
        console.log(user)
    }).catch(error => {
        console.log(error)
    })
}

export const generateAccessToken = (userID) => {
    return jwt.sign(userID, process.env.TOKEN_SECERT, { expiresIn: '180s' })
}