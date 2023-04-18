const { Model, DataTypes } = require('sequelize');
const db = require('../config/connection');

class House extends Model { }

House.init({
    id: {
        type: DataTypes.INTEGER,
        type: DataTypes.TEXT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    password: {
        type: DataTypes.TEXT
    },
}, {
        sequelize: db,
        modelName: 'house'
    });


module.exports = House;

