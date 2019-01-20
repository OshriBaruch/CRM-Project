const mongoose = require('mongoose')

const Clients = require('../model/Clients')
mongoose.connect(process.env.CONNECTION_STRING || "mongodb://localhost/CRM-DB")

let data = require('../react-crm-starter/data.json')

let separateName = [];

data.forEach(d => {
    let client = new Clients({
        name: d.name.split(" ")[0],
        email: d.email,
        firstContact: d.firstContact,
        emailType: d.emailType,
        sold: d.sold,
        owner: d.owner,
        country: d.country,
        surname: d.name.split(" ")[1]
    })
    client.save()
});