const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const db = require('./db/connect')
// 读取 body 和显示日志的中间键
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(morgan('combined'))
// 路由
var router = require('./router')(app)

app.listen(3000, () => {
    console.log('Service has already run')
})