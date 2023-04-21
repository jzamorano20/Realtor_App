const router = require('express').Router();

const user_routes = require('./user')
const view_routes = require('./view_routes')


router.use('/', [view_routes,user_routes])

 module.exports = router;

