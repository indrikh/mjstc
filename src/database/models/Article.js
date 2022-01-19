export default (sequelize, DataTypes, Model) => {

    class Article extends Model {

        static async createArticle(userId, body) {
            const article = await Article.create({body: body, UserId: userId})
            return article
        }

        static async getArticle(articleId) {
            const article = await Article.findByPk(articleId)
            return article
        }

        static async getAllArticles() {
            const articles = await Article.findAll()
            const res = []
            articles.forEach(item => {
                res.push(item.body)
            })
            return res
        }

        static async deleteArticle(articleId) {
            const result = await Article.destroy({
                where: {
                    id: articleId
                }
            })

            return result
        }
    }

    Article.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        body: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'Article',
        timestamps: false
    })

    return Article
}