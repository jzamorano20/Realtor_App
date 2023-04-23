const router = require('express').Router();
const { User, House } = require('../../models');


// controllers/private
function isAuthenticated(req, res, next) {
    if (!req.session.user_id) {
        return res.redirect('/login');
    }
    // If they're authenticated, we move on to the next route callback
    next();
}



router.get('/dashboard', isAuthenticated, async (req, res) => {
    // Get the user by their id that is stored to the session
    const user = await User.findByPk(req.session.user_id);
    const houses = await user.getHouses();
    
    // Render the dashboard view and share the user's email address
    // so we can output it in the hbs html
    res.render('private/dashboard', {
        user_name: user.user_name

    });
});


// render and redirect to house listing page
router.get('/houseListings', isAuthenticated, async (req, res) => {
    const listings = await House.findAll();
    // console.log(listings)
    res.render('private/houseListings', { listings: listings });

});


// render and redirect to house posting page
router.get('/posting', isAuthenticated, async (req, res) => {
    res.render('private/posting');
});

router.post('/posting', isAuthenticated, async (req, res) => {

    try {
        const user = await User.findOne({
            where: {
                id: req.session.user_id
            }
        });
        const house_data = req.body;

        // console.log("House data: \n", house_data);
        await user.createHouse(house_data);
        // console.log('reached posting creation');
        // console.log(user);
        res.redirect('/');
    } catch (err) {
        console.log(err);
        res.redirect('/posting');
    }

});


router.get('/favorites', isAuthenticated, async (req, res) => {
    const user = await User.findOne({
        where: {
            id: req.session.user_id
        },
        include: {
            model: House,
            as: 'favorites'
        }
    });
    res.render('favorites', {
        favorites: user.favorites
    });
});


router.post('/favorites/:fav_id', isAuthenticated, async (req, res) => {
    const user = await User.findByPk(req.session.user_id);
    const house = await House.findByPk(req.params.fav_id);

    console.log(req.params.fav_id);
    // console.log(house);
    // console.log(user);

    // Checks if the house was created by the session user
    if (house.userId != user.id) {
        console.log('reached redirect in favorite post')
        await user.addFavorites(house);
        res.redirect('/favorites');

    }

    console.log('Not redirected in favorite post');
});

module.exports = router;