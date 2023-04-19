const { Model, DataTypes } = require('sequelize');
const db = require('../config/connection');

class UserHouse extends Model { }

UserHouse.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'user',
            key: 'id'
        }
    },
    house_id: {
        type:DataTypes.INTEGER,
        references: {
            model: 'house',
            key: 'id'
        }
    }
}, {
        sequelize: db,
        modelName: 'UserHouse'
    });


module.exports = UserHouse;

