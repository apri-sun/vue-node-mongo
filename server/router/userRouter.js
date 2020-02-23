const express = require('express')
const router = express.Router()
const user = require('../db/model/userSchema')
const MD5 = require('crypto-js/md5')

function encipherment(ps) {
    return MD5(ps).toString()
}

router.post('/register', (req, res) => {
    let {us, ps} = req.body
    // 加密
    ps = encipherment(ps)
    user.find({us}, (err, docs) => {
        if(docs.length === 0) {
            user.insertMany({us, ps})
            return res.send({err: 0, msg: '注册成功'})
        }
        return res.send({err: 2, msg: '用户已注册'})
    })
})

router.get('/login', (req, res) => {
    let {us, ps} = req.body
    ps = encipherment(ps)
    console.log(ps)
    user.find({us, ps}, (err, docs) => {
        if(err) {
            return res.send({err: 3, msg: '服务器内部错误'})
        }
        if(docs.length === 0) { 
            return res.send({err: 1, msg: '用户名或密码错误'}) 
        }
        return res.send({err: 0, msg: '登录成功'})
    })
})

module.exports = router