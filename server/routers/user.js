const express = require('express')
const router = new express.Router()
const User = require('../models/user')

router.post('/user', async (req, res) => {
    try {
        await User.create({ user: req.body.user })
        res.status(200).send()
    }
    catch (e) {
        res.status(500).send()
    }
})

router.post('/disconnect', async (req, res) => {
    const user = req.body.user
    try {
        await User.findOneAndDelete({ user })
        res.status(200).send()
    } catch (err) {

        res.status(500).send()
    }
})
module.exports = router