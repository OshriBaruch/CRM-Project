const express = require('express')
const Clients = require('../model/Clients')
const router = express.Router()
const bodyParser = require('body-parser')

//Upload files to badges and charts
const RechartsClass = require('../scripts/recharts')
const BadgesClass = require('../scripts/badges')


router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: false }))

router.get('/clients', (req, res) => {
    Clients.find({}, (err, result) => res.send(result))
})

router.put('/client', (req, res) => {
    const obj = req.body
    Clients.findByIdAndUpdate(obj._id, obj, { new: true }, function (err, result) {
        err || (!result) ? res.send(false) : res.send(true)
    })
})
router.post('/client', (req, res) => {
    const obj = new Clients(req.body)
    obj.save()
    res.end()
})

router.get('/analytics', (req, res) => {
    Clients.find({}, (err, result) => {
        const Badges = new BadgesClass
        const Recharts = new RechartsClass(result)
        res.send({
            badges: Badges.getClientBadges(result),
            recharts: Recharts.getRecharts()
        })
    })
})

// upload all the Data to Heroku

// router.get('/uploadData', (req, res) => {
//     let data = require('../crm-client-data/data.json')
//     data.forEach(d => {
//         let client = new Clients({
//             name: d.name.split(" ")[0],
//             surname: d.name.split(" ")[1],
//             email: d.email,
//             firstContact: d.firstContact,
//             emailType: d.emailType,
//             sold: d.sold,
//             owner: d.owner,
//             country: d.country
//         })
//         client.save()
//     })
//     res.end()
// })

module.exports = router
