const router = require('express').Router();


/// Middleware function to redirect a logged in user to the dashboard
// We don't want to show auth pages if they're logged in
function isLoggedIn(req, res, next) {
    if (!req.session.user_id) return res.redirect('/login');

    next();
}

// Render the Homepage view
router.get('/', isLoggedIn, (req, res) => {
    res.render('dashboard');
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

