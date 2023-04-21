const router = require('express').Router();

const dashboard_routes = require('./dashboard_routes')
const user_routes = require('./user_routes')

router.use('/', dashboard_routes)
router.use('/user', user_routes)


module.exports = router;
