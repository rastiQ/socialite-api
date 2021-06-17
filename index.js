const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

require('dotenv').config()

const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.DATABASE_URI, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
    console.log('Connection to DB successfull')
}).catch(error => {
    console.error(error)
}) 

app.listen(3000)