import express from 'express'
const app = express()


import cors from 'cors'
app.use(cors())

app.use(express.json())


// app.use(express.urlencoded({ extended: true }))

// app.use(express.static("./Public"))

import cookieParser from 'cookie-parser'
app.use(cookieParser())

import router from './Routes/routes.js'
app.use('/api', router)

export default app;