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

const start = async () => {
    try {
        
        app.listen(PORT, () => console.log(`server staeted at ${PORT}`))
    }
    catch(e) {
        console.log(e)
    }
}

start()

// app.get('/', (req, res) => {
//     req.session.isAuth = true
//     res.send({res: "hello world"})
//     console.log(req.sessionID)
//     res.status(200)
// })

// const authCheck = (req, res, next) => {
//     if(!req.session.isAuth) {
//         res.redirect('/')
//     } else {
//         next()
//     }
// }

// app.get('/home', authCheck, (req, res) => {
//     res.send({res: "home"})

// })

// app.post('/registration', (req, res) => {
//     const {username, password} = req.body
//     console.log(username)
//     res.send({res: "hello world"})
//     res.status(200)
// })

