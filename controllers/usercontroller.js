const { User } = require ('../models')
// works now because you can open and close the const
const userController = {
    //post createUsers
    createUsers({body}, res) {
    User.create(body)
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {

        console.log(err);
        // status idk if send status works
        // and .json(err) that way you can use the err message but in this case i think it will just say err so instead you can do err.message and that should i think come up with 
        // mongodb or mongoose's customized error message
        res.status(400).json(err.message);
    })
    },
    
    //get user by single id
    getUsersById({params}, res) {
        User.findOne({_id: params.id})
        .populate({path: 'thoughts', select: '-__v'})
        .populate({path: 'friends', select: '-__v'})
        .select('-__v')
        // return if no user is found 
        .then(dbUsersData => {
            if(!dbUsersData) {
                res.status(404).json({message: 'No User with this particular ID!'});
                return; 
            }
            res.json(dbUsersData)
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err)
        })
    },
    //get allUsers
    getAllUsers(req, res) {
        User.find({})
        .populate({path: 'thoughts', select: '-__v'})
        .populate({path: 'friends', select: '-__v'})
        .select('-__v')
        .sort({ _id: -1})
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        })
    },
     //updating users with params
     updateUsers({params, body}, res) {
        //user finds one id and updates to a new one
        Users.findOneAndUpdate({_id: params.id}, body, {new: true, runValidators: true})
        .then(dbUsersData => {
            if(!dbUsersData) {
                res.status(404).json({message: 'user not found with this id try again lol'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err))
    },
