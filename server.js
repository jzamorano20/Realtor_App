require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const PORT = process.env.PORT || 3000;
const routes = require('./controllers')
const db = require('./config/connection');
const { engine } = require('express-handlebars');
const session = require('express-session');
const public_routes = require('./controllers/public_routes');
const private_routes = require('./controllers/private_routes');
const auth_routes = require('./controllers/auth_routes');
const { engine } = require('express-handlebars');
const db = require('./config/connection');
const { User, House } = require('./models');


const app = express();

// Static and middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static('public'));


// Setup handlebars
app.engine('hbs', engine({
  extname: '.hbs',
  runtimeOptions: {
    allowProtoPropertiesByDefault: true
  }
}));

app.set('view engine', 'hbs');
app.set('views', './views');

// Setup the req.session object for our routes
app.use(session({
  // Required to be used to validate the client cookie matches the session secret
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));


// Load all of our routes at the root

app.use(routes)

db.sync({ force: true }).then(async () => {
  const user1 = await User.create({
    user_name: 'John',
    password: 'Doe'
  });
  const user2 = await User.create({
    user_name: 'Jane',
    password: 'Doe'
  });

  const house1 = await user1.createHouse({
    location: "123 Street",
    price: 25555.00,
    type: "1 room closet"
  });

  const house2 = await user2.createHouse({
    location: "555 Street",
    price: 25555.00,
    type: "1 bathroom"
  });

  // injects a row into the pivot table 
  await user1.addFavorites(house2);
  await user2.addFavorites(house1);
  
  const pulledUser = await User.findOne({
    where: {
      user_name: "John"
    },
    include: [
      House, //Get house they made, hasMany association
      {
        model: House,
        as: 'favorites'
      } // Belong to Many association - we grabbed by alias name "favorites"
    ]
  });

  const pulledUser2 = await User.findOne({
    where: {
      user_name: "Jane"
    },
    include: {
      model: House,
      as: 'favorites'
    }
  });


  // console.log(pulledUser.houses);
  console.log(pulledUser)
  // console.log(pulledUser2.favorites);

  app.listen(PORT, () => console.log('Server started on port :) %s', PORT))
});

