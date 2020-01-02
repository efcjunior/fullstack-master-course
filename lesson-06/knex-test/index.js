const knex = require('knex')({
    client: 'mysql2',
    connection: {
        host:'127.0.0.1',
        user: 'root',
        password: '',
        database: 'cadastro'}
})

const execute = async () => {
    console.log('Knex operations')
    /*await knex('pessoas')
        .insert({
            nome: 'Everson',
            nasimento: '1986-03-16',
            cargo: 'bancário'
        })*/

    /*const pessoas = await knex('pessoas').select('*')
    console.log(pessoas)*/
    /*await knex('pessoas').where({id: 100}).update({nome: 'João'})*/
    await knex('pessoas').where({id : 100}).del()
}

execute()
