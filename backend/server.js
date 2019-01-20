const express = require('express')
const api = require('./server/routes/api')
const bodyParser = require('body-parser')
const app = express()


const mongoose = require('mongoose')
mongoose.connect(process.env.CONNECTION_STRING || "mongodb://localhost/CRM-DB")


app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
  next()
})

app.use('/', api)
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.listen(process.env.PORT || 1996, function() {
  console.log("Server running : port 1996")
})
