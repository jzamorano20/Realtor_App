const router = require('express').Router();
const { User, House } = require('../models');

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

    // Render the dashboard view and share the user's email address
    // so we can output it in the hbs html
    res.render('private/dashboard');
});


// render and redirect to house listing page
router.get('/houseListings', isAuthenticated, async (req, res) => {
    const listings = await House.findAll();

    res.render('houseListings', { listings: listings });

});



// render and redirect to house posting page
router.get('/posting', isAuthenticated, async (req, res) => {
    const user = await User.findOne({
        where: {
            id: req.session.user_id
        }
    });
    const house_data = req.body;

    try {

        await user.createHouse(house_data);

        res.redirect('/');
    } catch (err) {
        res.redirect('/posting');
    }

    res.render('postings');

});

router.get('/favorites',isAuthenticated, async (req, res)=>{
    const user = await User.findOne({
        where:{
            id: req.session.user_id
        },
        include:{
            model: House,
            as: 'favorites'
        }
    });
    res.render('favorites',{
        favorites: user.favorites
    });
});


router.post('/favorites/:fav_id',isAuthenticated, async (req,res)=>{
    const user = await User.findByPk(req.session.user_id);
    const house = await House.findByPk(req.params.fav_id);
    if(house.userId != user.id){
        await user.addFavorites(house);
        res.redirect('/favorites');

    }


});




module.exports = router;