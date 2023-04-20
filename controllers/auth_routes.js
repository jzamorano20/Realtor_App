const router = require('express').Router();
const { User, House } = require('../models');


router.get('/', async (req, res) => {

    res.send("reached public");
});

module.exports = router;