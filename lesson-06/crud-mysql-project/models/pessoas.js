const findAll = async (connection) => {
    /*return new Promise((resolve, reject) => {        
        connection.query('select * from pessoas', (err, results) => {  
            if(err){
                reject(err)
            }else{
                resolve(results)
            }            
        })     
    })*/
    return await connection('pessoas').select('*')
}

const findById = async (connection, id) => {
    /*return new Promise((resolve, reject) => {        
        connection.query('select * from pessoas where id = ' + id + ' limit 1', (err, results) => {  
            if(err){
                reject(err)
            }else{
                if(results.length > 0){
                    resolve(results[0])
                }else{
                    resolve({})
                }
                
            }            
        })     
    })*/

    return await connection('pessoas').where({id : id}).first()
}

const deleteOne = async (connection, id) => {
    /*return new Promise((resolve, reject) => {
        connection.query('delete from pessoas where id = ' + id + ' limit 1', (err) => {
            if(err){
                reject(err)
            }else{
                resolve()
            }   
        })
    })*/
    await connection('pessoas').where({id : id}).del()
}

const create = async (connection, data) => {
    /*return new Promise((resolve, reject) => {        
        connection.query(`insert into pessoas (nome, nascimento, cargo) values ('${data.nome}', '${data.nascimento}', '${data.cargo}')`, (err) => {
            if(err){
                reject(err)
            }else{
                resolve()
            }
        })
    })*/
    await connection('pessoas')
        .insert({
            nome: data.nome,
            nascimento: data.nascimento,
            cargo: data.cargo
        })
}

const updateOne = async (connection, data, id) => {
    /*return new Promise((resolve, reject) => {        
        connection.query(`update pessoas set nome = '${data.nome}', nascimento = '${data.nascimento}', cargo = '${data.cargo}' where id = ${id}`, (err) => {
            if(err){
                reject(err)
            }else{
                resolve()
            }
        })
    })*/
    await connection('pessoas')
    .where({id:id})
    .update({
        nome: data.nome,
        nascimento: data.nascimento,
        cargo: data.cargo
    })
}

module.exports = {
    findAll,
    findById,
    deleteOne,
    create,
    updateOne
}