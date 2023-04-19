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
        type: DataTypes.TEXT,
        allowNull: false
    },
    type: {
        type:DataTypes.TEXT,
        allowNull: false
    }
}, {
        sequelize: db,
        modelName: 'house'
    });


module.exports = House;

