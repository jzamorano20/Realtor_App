const { Model, DataTypes } = require('sequelize');
const House = require('./House');
const db = require('../config/connection');

class User extends Model {

    async validatePass(provided_password) {
        // bcrypt compare returns a boolean, based on if the string matches the encrypted string
        const is_valid = await bcrypt.compare(provided_password, this.password);

        return is_valid;
    }

 }

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

// Have to alias it because we have to different associations using House
User.belongsToMany(House,{through:'user_favorites', as: 'favorites'});
User.hasMany(House);
House.belongsTo(User);

module.exports = User;



