const express = require('express')
const Clients = require('../model/Clients')
const router = express.Router()
const bodyParser = require('body-parser')

let BadgesClass = require('../scripts/badges')
const Badges = new BadgesClass

let RechartsClass = require('../scripts/recharts')
const Recharts = new RechartsClass

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: false }))

router.get('/allClient', (req, res) => {
    Clients.find({}, (err, result) => res.send(result))
})

router.put('/client', (req, res) => {
    const obj = req.body
    Clients.findByIdAndUpdate(obj._id, obj, { new: true }, function (err, result) {
        err || (!result) ? res.send(false) : res.send(true)
    })
})
router.post('/saveNewClient', (req, res) =>{
    const obj = new Clients(req.body)
    obj.save()
    res.end()
})

router.get('/analytics', (req, res) =>{
    let analytics = {};
    Clients.find({}, (err, result) => {
        analytics.badges = Badges.getClientBadges(result)
        analytics.recharts = Recharts.getRecharts(result)
        res.send(analytics)
    })
})

module.exports = router
