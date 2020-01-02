const mysql = require('mysql')
const connection = mysql.createConnection({
    host:'127.0.0.1',
    user: 'root',
    password: '',
    database: 'cadastro'
})

connection.connect((err) => {
    if(err){
        console.log('Error to connect')    
    }else{
        console.log('Mysql connected')
        connection.query('select * from pessoas', (err, result) => {
            console.log(err, result)
            connection.end()
        })        
    }
})