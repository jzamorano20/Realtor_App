require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const PORT = process.env.PORT || 3000;
const session = require('express-session');
const public_routes = require('./controllers/public_routes');
const private_routes = require('./controllers/private_routes');
const auth_routes = require('./controllers/auth_routes');
const { engine } = require('express-handlebars');
const db = require('./config/connection');


const app = express();

app.engine('hbs', engine({
  extname: '.hbs'
}));

app.set('view engine', 'hbs');
app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use(session({
  // Required to be used to validate the client cookie matches the session secret
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));


app.use('/', public_routes);

db.sync().then(() => {
    app.listen(PORT, () => console.log('Server started on port :) %s', PORT))
  });

