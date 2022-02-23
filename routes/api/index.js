//setting requirments + api routes
const router = require ('express').Router();
const userRoutes = require('./thoughtsroutes');
const thoughtsRoutes = require('./userroutes');

//add created routes here
router.use('/thoughts', thoughtsRoutes);
router.use('/user', userRoutes);

module.exports = router;
