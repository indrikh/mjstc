import userController from "./controllers/userController.js"
import articleController from "./controllers/articleController.js"
import { Router } from "express"
import { check } from "express-validator"

const authCheck = (req, res, next) => {

    if(!req.session.userId) {
        res.json({message: 'Need to auth!'})
    } else {
        next()
    }
}

const registrationCheck = (req, res, next) => {
    if(req.session.userId) {
        res.json({message: 'You already logged in!'})
    } else {
        next()
    }
}

const router = new Router()

router.post('/login', [
    registrationCheck,
    check('username', 'Имя пользователя не может быть пустым').notEmpty(),
    check('password', 'Пароль не может быть пустым').notEmpty().isString(),
], userController.UserController.login)

router.post('/registration', [
    registrationCheck,
    check('username', 'Имя пользователя не может быть пустым').notEmpty(),
    check('password', 'Пароль не может быть пустым').notEmpty().isString(),
], userController.UserController.registration)

router.post('/logout', authCheck, userController.UserController.logout)

router.get('/article/:articleId', authCheck, articleController.ArticleController.getArticle)

router.delete('/article/:articleId', authCheck, articleController.ArticleController.deleteArticle)

router.post('/article/all',authCheck, articleController.ArticleController.getAllArticle)

router.post('/article/create', [
    check('articleBody', 'Текст статьи не может быть пустым').notEmpty(),
    authCheck
], articleController.ArticleController.createArticle)

export default router