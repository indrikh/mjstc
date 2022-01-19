import { Sequelize, DataTypes, Model } from "sequelize"

const sequelize = new Sequelize('mjstc', 'root', '1111', {
    dialect: 'mysql',
    host: 'localhost',
    port: '3306',
    logging: false,
})

const testConnection = async (sequelize) => {
    await sequelize.authenticate().then(() => {
        console.log('Успешное подключение к базе данных');
    }).catch(e => {
        console.log(`Ошибка подключения к базе данных ${e}`)
    })
}

testConnection(sequelize)

import UserModel from "./models/User.js"
import ArticleModel from "./models/Article.js"

export const User = UserModel(sequelize, DataTypes, Model)
export const Article = ArticleModel(sequelize, DataTypes, Model)

User.hasMany(Article)

const forceSync = true

async function syncModels() {
	await sequelize.sync({ forceSync }).then(() => {
		console.log('Все модели синхронизированны')
	}).catch((error) => {
		console.log('Ошибка в синхронизации моделей: ', error)
	})
}

syncModels()