const { House } = require('../models');

const house = [
    {
        location: 'NJ',
        price: '25000.00',
        type: 'single family'
    },
    {
        location: 'PA',
        price: '40000.00',
        type: ' 2 family'
    }, {
        location: 'NY',
        price: '7000000.00',
        type: 'condo'
    }, {
        location: 'CN',
        price: '25000.00',
        type: 'single family'
    },
];

const seedHouse = () => House.bulkCreate(house);

module.exports = seedHouse;
