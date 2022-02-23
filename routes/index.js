//require express for routes
const router = require('express').Router();
//import routes from api folder
const apiRoutes = require('./api');

//router use so api is used for all routed
router.use('/api', apiRoutes)

//404=error message
router.use((req, res) => {
    res.status(404).send('<h1> lol try again 404 ERROR </h1>');
});

module.exports = router;
