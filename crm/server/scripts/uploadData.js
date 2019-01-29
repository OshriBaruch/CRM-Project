const mongoose = require('mongoose')
const moment = require('moment')

const Clients = require('../model/Clients')
mongoose.connect(process.env.CONNECTION_STRING || "mongodb://localhost/CRM-DB")

let data = require('../react-crm-starter/data.json')
data = data.slice(300,350)

data.forEach(d => {
    let client = new Clients({
        name: `${d.name.split(" ")[0]}`,
        email: d.email,
        firstContact: moment().format('L'),
        emailType: d.emailType,
        sold: d.sold,
        owner: `${d.owner}-2`,
        country: d.country,
        surname: `${d.name.split(" ")[1]}-2`
    })
    console.log('save')
    client.save()
});