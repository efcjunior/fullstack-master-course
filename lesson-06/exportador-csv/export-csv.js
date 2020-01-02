const mysql = require('mysql')
const fs = require('fs')

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'cadastro'
})

const writable = fs.createWriteStream('pessoas.csv')

writable.write('id,nome,nascimento,cargo\n', () => {
    connection.connect((err) => {
        const query = connection.query('select * from pessoas')
        query.on('result', (row) => {
            connection.pause()
            const data = row.id + ',' + row.nome + ',' + row.nascimento + ',' + row.cargo + '\n'
            setTimeout(() => {
                writable.write(data, () => {
                    connection.resume()
                })
            }, 1000)           
        })
        query.on('end', () => {
            connection.end()
            writable.end()
        })
    })
})