import bcrypt from "bcryptjs"
import config from "../../../config.js"

export default (sequelize, DataTypes, Model) => {

    class User extends Model {

        static async createUser(username, password) {
            const exist = await User.findOne({
                where: {
                    username: username
                }
            })

            if(exist) return

            const user = await User.create({
                username: username,
                password: await bcrypt.hash(password, config.HASH_SALT)
            })

            return user
        }

        static async login(username, password) {
            const user = await User.findOne({
                where: {
                    username: username, 
                }
            })

            if(!user) return 

            const validPassword = await bcrypt.compare(password, user.password)

            if(!validPassword) return

            return user
        }

        static async userExistById(userId) {
            const exist = await User.findByPk(userId)
            return exist !== null
        }
    }

    User.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'User',
        timestamps: false
    })

    return User
}