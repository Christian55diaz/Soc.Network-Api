const router = require ('express').Router();

//const coming from thought controller to work with insomnia to allow for good routes
const {
    getAllThoughts, 
    getThoughtsById, 
    createThoughts, 
    updateThoughts,
    deleteThoughts
   
    //we have to require the thought controller so that the routes link to the controller
} = require('../../controllers/thoughtscontroller');
