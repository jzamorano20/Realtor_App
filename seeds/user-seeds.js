const { User } = require('../models');

const user = [
    {
        user_name: 'test-1',
        password: 'password'
    },
    {
        user_name: 'test-2',
        password: 'password'

    },
    {
        user_name: 'test-3',
        password: 'password'

    },
    {
        user_name: 'test-4',
        password: 'password'

    },
];

const seedUsers = () => User.bulkCreate(user);

module.exports = seedUsers;
