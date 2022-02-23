const { User } = require ('../models')
const { Thoughts } = require ('../models')
const router = require('../routes/api/userroutes')

//get allUsers
const userController = { 
    getAllUsers(req, res) {
        User.find({})
        .select('-__v')
        .sort({ _id: -1})
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },

}

//post createUsers

//get UsersById

//put updateUsers

//delete deleteUsers

//post addFriend 

//delete deleteFriend