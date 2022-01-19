import {Article, User} from "../database/database.js"
import { validationResult } from "express-validator"

export default ( () => {

    class ArticleController {

        async createArticle(req, res) {
            try {
                const errors = validationResult(req)
                if(!errors.isEmpty()) return res.status(400).json({message: 'Article creation error', errors})

                const articleBody = req.body.articleBody
                const userId = req.session.userId
                const exist = await User.userExistById(userId)

                if(!exist) return res.status(400).json({message: 'User doesnt exist'})

                const article = await Article.createArticle(userId, articleBody)

                if(!article) return res.status(400).json({message: 'Article creation error'})
                return res.json({message: 'Article created!'})
            } catch(e) {
                console.log(e)
                res.status(400).json({message: 'Article creation error'})
            }
        }

        async deleteArticle(req, res) {
            try {
                const articleId = req.params.articleId
                
                const result = await Article.deleteArticle(articleId)
                
                if(!result) return res.status(400).json({message: 'Cant find article'})

                return res.json({message: 'Article seccesfully deleted!'})
            } catch(e) {
                console.log(e)
                res.status(400).json({message: 'Article delete error'})
            }
        }

        async getArticle(req, res) {
            try {
                const articleId = req.params.articleId
                const articleFind = await Article.getArticle(articleId)

                if(!articleFind) return res.status(400).json({message: 'Article doesnt exist'})

                return res.json({message:`Article found: ${articleFind.body}`})
            } catch(e) {
                console.log(e)
                res.status(400).json({message: 'Get article error'})
            }
        }

        async getAllArticle(req, res) {
            try {
                const articles = await Article.getAllArticles()

                return res.json({data: `${articles}`})
            } catch(e) {
                console.log(e)
                res.status(400).json({message: 'Get articles error'})
            }
        }
    }

    return {
        ArticleController: new ArticleController()
    }
})()