const mongoose = require('mongoose')
const Schema = mongoose.Schema

const clientsSchema = new Schema({
    name : String,
    email : String,
    firstContact : Date,
    emailType : String,
    sold : Boolean,
    owner : String,
    country : String,
    surname : String
})

const Clients = mongoose.model("Clients", clientsSchema)

module.exports = Clients