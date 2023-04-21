const { Model, DataTypes } = require('sequelize');
const db = require('../config/connection');

class House extends Model { }

House.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER
    },
    type: {
        type:DataTypes.STRING,
        allowNull: false
    },
}, {
        sequelize: db,
        modelName: 'house'
    });


module.exports = House;

