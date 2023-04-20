const router = require('express').Router();
const { User, House } = require('../model');


router.get('/', async (req, res) => {

    res.send("reached public");
});