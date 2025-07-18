const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const userRoutes = require('./routes/userRoutes')
const courseRoutes=require('./routes/courseRoutes')

// express app
const app = express()

// middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.use('/api/user', userRoutes)
app.use('/api/courses', courseRoutes)

// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
    console.log('connected to db & listening on port', process.env.PORT)
    })
    })
    .catch((error) => {
    console.log(error)
})