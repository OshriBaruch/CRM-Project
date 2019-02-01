const express = require('express')
const Clients = require('../model/Clients')
const router = express.Router()
const bodyParser = require('body-parser')
let RechartsClass = require('../scripts/recharts')
let BadgesClass = require('../scripts/badges')


router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: false }))

// read about RESTful api
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
// router.get('/uploadData', (req, res) => {
//     let data = require('../react-crm-starter/data.json')
//     // data = data.slice(300, 350)
//     data.forEach(d => {
//         let client = new Clients(d)
//         console.log('save ', d.name)
//         client.save()
//     })
//     res.end()
// })
module.exports = router
