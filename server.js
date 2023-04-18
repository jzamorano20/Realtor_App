const express = require('express');
const mysql = require('mysql2');
const PORT = process.env.PORT || 3000;
const view_routes = require('./controller/api_routes');
const db = require('./config/connection');
const { engine } = require('express-handlebars');


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static('public'));

app.engine('hbs', engine({
  extname: '.hbs'
}));




// app.use('/', view_routes);

db.sync().then(() => {
    app.listen(PORT, () => console.log('Server started on port %s', PORT))
  });

