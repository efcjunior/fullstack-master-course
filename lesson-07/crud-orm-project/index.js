const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const app = express()
const port = process.env.Port | 3000

const pessoas = require('./routes/pessoas')
const model = require('./models/index')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({'extended' : false}))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.get('/', (req, res) => res.render('index'))
app.use('/pessoas', pessoas)

model.sequelize.sync({force: true}).then(() => {
    app.listen(port, () => console.log('crud-orm-project listening on Port ' + port))
})