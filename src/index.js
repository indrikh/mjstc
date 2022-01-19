import express from "express"
import session from "express-session"
import router from "./routes.js"

import config from "../config.js"

import {} from './database/database.js'

const PORT = process.env.PORT ?? 3000

const app = express()
app.disable('x-powered-by')

app.use(express.json())
app.use(
    session({
        name: config.SESSION_NAME,
        secret: config.SECRET_KEY,
        resave: false,
        saveUninitialized: false,
    })
)

app.use('/', router)

const start = () => {
    app.listen(PORT, () => console.log(`server staeted at ${PORT}`))
}

start()


