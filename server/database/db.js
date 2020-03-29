const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/socket', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})

const db = mongoose.connection

module.exports = db