const express = require('express')
const http = require('http')
const app = express()
require('dotenv').config()
const mongoDb = require('./database/mongodb/mongodb')
const bodyParser = require("body-parser")
const port = process.env.PORT || 8080
const eventRouts = require('./routs/event')
const profileRouts = require('./routs/profile')
const server = http.createServer(app)


server.listen(port, () => {
    mongoDb.connect()
    console.log(`server started on port ${port}`)
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// handeling CORS mechanism
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET")
    return res.status(200).json({})
  }
  next()
})

// Routes which should handle requests
app.use('/event', eventRouts)
app.use('/profile', profileRouts)


app.use((req, res, next) => {
  const error = new Error("Not found")
  error.status = 404
  next(error)
})

app.use((error, req, res, next) => {
  res.status(error.status || 500)
  res.json({
    error: {
      message: error.message
    }
  })
})
