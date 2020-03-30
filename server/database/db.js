const mongoose = require('mongoose')
const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/socket'
mongoose.connect(MONGODB_URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})