const Sequelize = require('sequelize')
const sequelize = new Sequelize('cadastro', 'root', '', {
    dialect: 'mysql',
    host: '127.0.0.1'
})

const People = sequelize.define('People', {
    name: Sequelize.STRING,
    birth: Sequelize.DATE
})

const User = sequelize.define('User', {
    user: Sequelize.STRING,
    password: Sequelize.STRING
})

const Project = sequelize.define('Project', {
    name: Sequelize.STRING
})

People.hasOne(User)
User.belongsTo(People)

People.hasOne(Project)
Project.belongsTo(People)

const testDB = async () => {
    await sequelize.sync({force: false})

    /*const people = await People.create({
        name: 'everson',
        birth: '1986-10-23'
    })

    const user = await User.create({
        user: 'efcjunior',
        password: '123456'
    })

    user.setPerson(people)*/

    /*const findAll = async () => {
        const users = await User.findAll().map(u => {return u.user})
        console.log(users)
    }*/

    /*const users = await User.findAll()
    const people = await Promise.all(users.map(async u => {return await u.getPerson()}))
    console.log(people)*/

    const users = await User.findAll({
        include:[
            {model: People}
        ]
    })

    console.log(users)
}

testDB()







