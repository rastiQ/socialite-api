import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import * as endpoints from './src/endpoints/endpoints.js'

//environment variables
dotenv.config()
const app = express()

//middleware
app.use(cors())
app.use(express.json())

//database connection
mongoose.connect(process.env.DATABASE_URI, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
    console.log('Connection to DB successfull')
}).catch(error => {
    console.error(error)
}) 

//api endpoints
app.get('/user/:id', endpoints.getUserByID)

app.listen(3000)