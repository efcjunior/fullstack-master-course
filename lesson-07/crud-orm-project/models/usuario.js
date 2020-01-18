const UsuarioModel = (sequelize, DataTypes) => {
    return sequelize.define('Usuario', {
        username: DataTypes.STRING,        
        senha: DataTypes.STRING
    })
}

module.exports = UsuarioModel