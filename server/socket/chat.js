const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const User = require('../models/user')

io.on('connection', socket => {
    socket.on('joinServer', async (user, cb) => {
        try {
            const _user = await User.findOne({ user })
            if (!_user) {
                throw Error()
            }
            _user.socket = socket.id
            await _user.save()

            const res = await User.returnOnlineUsers()
            io.emit('updateOnline', res)
            cb("OK")
        }
        catch (e) {
            cb(null)
        }
    })

    socket.on('sendMessage', async (message, cb) => {
        io.to(`${message.info.destSocket}`)
            .emit('incomingMessage', {
                message: message.message,
                sender: message.info.sender
            })
        cb()
    })
})

module.exports = {
    app, express, server
}