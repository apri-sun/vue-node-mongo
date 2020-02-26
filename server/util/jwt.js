const jwt = require('jsonwebtoken')

const secretKey = 'lbwnb'

function createToken(us) {
    return jwt.sign({us}, secretKey, { expiresIn: 60 })
}

function checkToken(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secretKey, (err, data) => {
            if(err) {
                reject({err: -1, msg: 'token验证失败'})
            }
            resolve(data)
            console.log(err)
            console.log(data)
        })
    })
}

module.exports = {
    createToken, checkToken
}