const express = require('express')
const router = express.Router()
const user = require('../db/model/userSchema')
const MD5 = require('crypto-js/md5')
const jwt = require('../util/jwt')

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
    let token = jwt.createToken(us)
    ps = encipherment(ps)
    console.log(ps)
    user.find({us, ps}, (err, docs) => {
        if(err) {
            return res.send({err: 3, msg: '服务器内部错误'})
        }
        if(docs.length === 0) { 
            return res.send({err: 1, msg: '用户名或密码错误'}) 
        }
        res.send({err: 0, msg: '登录成功', token})
    })
})

// token 检验
router.get('/token', (req, res) => {
    let {token} = req.body
    console.log(token)
    jwt.checkToken(token)
    .then((data) => {
        return res.send(data)
        console.log(data)
    })
    .catch((err) => {
        return res.send(err)
    })
    // res.send({err: 0, msg: '校验成功'})
})

module.exports = router
