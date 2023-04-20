const router = require('express').Router();
const {User, House, UserHouse} = require('../model');
const authRoutes = require('./auth_routes');
const privateRoutes= require('./private_routes');
const publicRoutes= require('./public_routes');

router.use('/authenticate', authRoutes);
router.use('/public', publicRoutes);
router.use('/private', privateRoutes);


module.exports(router);