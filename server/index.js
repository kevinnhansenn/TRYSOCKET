'use strict';

const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const User = require('./models/user')
const userRouter = require('./routers/user')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')

require('./database/db')

// Express
app.use(express.json())
app.use(userRouter)


// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'

async function start() {
    // Init Nuxt.js
    const nuxt = new Nuxt(config)

    const { host, port } = nuxt.options.server

    await nuxt.ready()
    // Build only in dev mode
    if (config.dev) {
        const builder = new Builder(nuxt)
        await builder.build()
    }

    // Give nuxt middleware to express
    app.use(nuxt.render)

    // Listen the server
    server.listen(port, host)
    consola.ready({
        message: `Server listening on http://${host}:${port}`,
        badge: true
    })
}
start()

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