const router = require('express').Router();

//const coming from thought controller to work with insomnia to allow for good routes
const {
    getAllThoughts, 
    getThoughtsById, 
    createThoughts, 
    updateThoughts,
    deleteThoughts
   
    //we have to require the thought controller so that the routes link to the controller
} = require('../../controllers/thoughtscontroller');

// making the routes usable
// routes to get all thoughts and create thoughts
router
    .route('/')
    .get(getAllThoughts)
    .post(createThoughts)
// routes with params of id 
// route to get thoughts by id, update thoughts by id, and delete thoughts by id.
router
    .route('/:id')
    .get(getThoughtsById)
    .put(updateThoughts)
    .delete(deleteThoughts)

// export router
module.exports = router;