require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const PORT = process.env.PORT || 3000;
const routes = require('./controllers')
const db = require('./config/connection');
const { engine } = require('express-handlebars');
const session = require('express-session');


const app = express();

// Static and middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static('public'));


// Setup handlebars
app.engine('hbs', engine({
  extname: '.hbs'
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

db.sync().then(() => {
    app.listen(PORT, () => console.log('Server started on port :) %s', PORT))
  });

