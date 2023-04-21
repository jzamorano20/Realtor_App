const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const db = require('../config/connection');

class User extends Model {
    async validatePass(Pass_provided) {
        const Pass_valid = await bcrypt.compare(Pass_provided, this.password)

        return Pass_valid;
    }
}

User.init({
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.TEXT,
        validate: {
            // checks the value if at least 10 characters in lenght
            len: 10
        },
        allowNull: false
    },
}, {
    sequelize: db,
    modelName: 'user',
    hooks: {
        async beforeCreate(user) {
            const encrypted_password = await bcrypt.hash(user.password, 10);
            user.password = encrypted_password;
        }
    }
});


module.exports = User;

