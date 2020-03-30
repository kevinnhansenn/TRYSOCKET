const { app, express, server } = require('./socket/chat')
const db = require('./database/db')
const cors = require('cors')
const userRouter = require('./routers/user')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')


// db.on('error', function () {
//     console.log("Connection Error")
// })

app.use(cors())
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
