const router = require ('express').Router;
// const { User, House } = require('../model');


/// Middleware function to redirect a logged in user to the dashboard
// We don't want to show auth pages if they're logged in
function isLoggedIn(req, res, next) {
    if (req.session.user_id) return res.redirect('/dashboard');

    next();
  }
  
  // Render the Homepage view
  router.get('/', isLoggedIn, (req, res) => {
    res.render('index');
  });
  
  // Render the Login Page view
  router.get('/login', isLoggedIn, (req, res) => {
    res.render('auth/login');
  });
  

  // Render the Register Page view
  router.get('/register', isLoggedIn, (req, res) => {
    res.render('auth/register');
  });
  
  module.exports = router;