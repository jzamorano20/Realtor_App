const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const House = require('./House');
const db = require('../config/connection');

class User extends Model {

    async validatePass(provided_password) {
        // bcrypt compare returns a boolean, based on if the string matches the encrypted string/password
        const is_valid = await bcrypt.compare(provided_password, this.password);

        return is_valid;
    }

 }

User.init({
    user_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING
    },
}, {
    sequelize: db,
    modelName: 'user',
    hooks:{
        async beforeCreate(user){
            const encryptedPassword = await bcrypt.hash(user.password, 10);
            user.password = encryptedPassword; 
        }
    }
});

// Have to alias it because we have to different associations using House
User.belongsToMany(House,{through:'user_favorites', as: 'favorites'});
User.hasMany(House);
House.belongsTo(User);

module.exports = User;



