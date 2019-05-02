const express = require('express')
const api = require('./server/routes/api')
const bodyParser = require('body-parser')
const path = require('path')
const app = express()

const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/CRM-DB")

app.use('/', api)
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'build')));
app.use(express.static(path.join(__dirname, 'node_modules')));
app.use(bodyParser.json())

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 1996, function() {
  console.log("Server running : port 1996")
})
