const userRouter = require('./router/userRouter')

module.exports = (app) => {
    app.use('/user', userRouter)
}