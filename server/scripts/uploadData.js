const mongoose = require('mongoose')
const moment = require('moment')

const Clients = require('../model/Clients')
mongoose.connect(process.env.CONNECTION_STRING || "mongodb://localhost/CRM-DB")


module.exports = uploadData