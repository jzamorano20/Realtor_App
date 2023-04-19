const { Model, DataTypes } = require('sequelize');
const db = require('../config/connection');

class User extends Model { }

User.init({
    user_name: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    password: {
        type: DataTypes.TEXT
    },
}, {
        sequelize: db,
        modelName: 'user'
    });


module.exports = User;



