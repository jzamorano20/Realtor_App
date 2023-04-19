const User = require('./User');
const House = require('./House');
const UserHouse = require('./UserHouse');

User.belongsToMany(House, {through: 'UserHouse'});
House.belongsToMany(User, {through: 'UserHouse'});


module.exports = {
    User,
    House,
    UserHouse
  }


  