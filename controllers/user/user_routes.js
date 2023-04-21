const router = require('express').Router();
const { User } = require('../../models');

// Route to receive the login form information - Triggered by the Login page form
router.post('/login', async (req, res) => {
  // The form data - email, passwords
  const user_id = req.session.user_id;
  if(user_id ){
    return res.redirect('/dashboard');
  }

  const user_data = req.body;

  // Find the user by the email address provided
  const user = await User.findOne({
    where: {
      user_name: user_data.user_name
    }
  });


  // If no user object is found, we redirect them to the register page
  if (!user) return res.redirect('/register');

  // Check that the provided password matches the encrypted pass stored in the database
  const valid_pass = await user.validatePass(user_data.password);

  // If the password is not a match, we redirect them to the login page
  if (!valid_pass) return res.redirect('/login');

  req.session.user_id = user.id;

  res.redirect('/dashboard');
});


router.post('/register', async (req, res) => {
  console.log('reached post')

  const user_data = req.body;
  console.log(user_data);
  try {
    const user = await User.create(user_data);

    // when user is created, is directed to dashboard
    req.session.user_id = user.id;
    res.redirect('/dashboard');
  } catch (err) {
    console.log(err);
    // If any error is thrown when creating the user, redirect them to login
    res.redirect('/register');
  }
});

// Route to log a user out
router.get('/logout', (req, res) => {
  // Remove all data from the session
  req.session.destroy();

  // Redirect them back to the homepage
  res.redirect('/');
});

module.exports = router;