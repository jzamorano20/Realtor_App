const router = require('express').Router();
const User = require('../models/User');

/// Middleware function to redirect a logged in user to the dashboard
// We don't want to show auth pages if they're logged in
function isLoggedIn(req, res, next) {
    if (!req.session.user_id) return res.redirect('/login');

    next();
}

// Render the Dashboard view
router.get('/', isLoggedIn, (req, res) => {
    const user_id = req.session.user_id;
    const user = User.findByPk(user_id);
    

    res.render('private/dashboard', user);
});

// Render the Login Page view
router.get('/login', (req, res) => {
    res.render('index');
});


// Render the Register Page view
router.get('/register', (req, res) => {
    res.render('register');
});


 module.exports = router;

