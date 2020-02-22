const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/vueNodeMongo')
let db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {
    console.log('DB connect sucessful')
})