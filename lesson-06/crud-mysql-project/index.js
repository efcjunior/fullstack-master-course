const express = require('express')
const path = require('path')
//const mysql = require('mysql')
const db = require('knex')({
    client: 'mysql2',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'cadastro'
    }
})
const bodyParser = require('body-parser')

const app = express()
const port = process.env.PORT || 3000

/*const connection = mysql.createConnection({
    host:'127.0.0.1',
    user: 'root',
    password: '',
    database: 'cadastro'
})*/

const pessoas = require('./routes/pessoas')

const dependencies  = {
    connection: db
}

app.use(bodyParser.urlencoded({'extended' : false}))
app.get('/', (req,res) => res.render('home'))
app.use('/pessoas', pessoas(dependencies))

app.use(express.static('public'))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

/*
connection.connect(()=>{
    app.listen(port, () => console.log('crud mysql project listening on Port: ' + port))
}) */

app.listen(port, () => console.log('crud mysql project listening on Port: ' + port))