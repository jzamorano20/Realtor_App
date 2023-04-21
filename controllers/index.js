const router = require('express').Router();

const api_routes = require('./api')
const view_routes = require('./view_routes')

router.use('/api', api_routes)
router.use('/', view_routes)

 module.exports = router;

