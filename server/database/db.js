const mongoose = require('mongoose')
const MONGODB_URL = process.env.MONGODB_URL

mongoose.connect(MONGODB_URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})

const db = mongoose.connection

module.exports = db