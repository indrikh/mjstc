import { User } from "../database/database.js"
import { validationResult } from "express-validator"
import config from "../../config.js"

export default ( () => {

    class UserController {

        async registration(req, res) {
            try {
                const errors = validationResult(req)
                if(!errors.isEmpty()) return res.status(400).json({message: 'Registration error', errors})

                const {username, password} = req.body
            
                const user = await User.createUser(username, password)

                if(!user) return res.status(400).json({message: 'Username already exist'})

                return res.json({message: 'User succesfully created!'})

            } catch(e) {
                console.log(e)
                res.status(400).json({message: 'Registration error'})
            }
        }

        async login(req, res) {
            try {
                const errors = validationResult(req)
                if(!errors.isEmpty()) return res.status(400).json({message: 'Auth error', errors})

                const {username, password} = req.body

                const user = await User.login(username, password)

                if(!user) return res.status(400).json({message: 'Wrong login or password'})

                req.session.userId = user.id
                return res.json({message: 'Login succesfully!'})

            } catch(e) {
                console.log(e)
                res.status(400).json({message: 'Auth error'})
            }
        }

        async logout(req, res) {
            req.session.destroy(e => {
                if(e) {
                    return res.json({message: 'Logout error'})
                }

                res.clearCookie(config.SESSION_NAME)
                return res.json({message: 'Logout seccesfully!'})
            })
        }
    }
    return {
        UserController: new UserController()
    }
})()