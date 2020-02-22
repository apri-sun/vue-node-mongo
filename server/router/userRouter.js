const express = require('express')
const router = express.Router()
const user = require('../db/model/userSchema')

router.post('/register', (req, res) => {
    let {us, ps} = req.body
    console.log(us, ps)
    user.insertMany({us, ps})
})

module.exports = router