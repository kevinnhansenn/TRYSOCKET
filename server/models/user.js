const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    user: {
        required: true,
        type: String,
        unique: true
    },
    socket: {
        type: String,
        default: null
    }
}, {
    timestamps: true
})

userSchema.statics.returnOnlineUsers = async function () {
    const User = this
    const users = await User.find({
        socket: {
            $nin: null
        }
    })
    let res = users.map((_user) => {
        return {
            socket: _user.socket,
            user: _user.user,
        }
    })

    return res
}

const User = mongoose.model('User', userSchema)

module.exports = User