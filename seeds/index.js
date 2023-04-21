const seedHouse = require('./houses-seeds');
const seedUsers = require('./user-seeds');

const sequelize = require('../config/connection')


const seedAll = async () => {
    await sequelize.sync({ force: true });
    console.log('\n----- DATABASE SYNCED -----\n');

    await seedHouse();
  console.log('\n----- HOUSES SEEDED -----\n');

  await seedUsers();
  console.log('\n----- USERS SEEDED -----\n');

  process.exit(0);
};

seedAll();
