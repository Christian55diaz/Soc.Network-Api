const { User } = require ('../models')


// works now because you can open and close the const
const UsersController = {
    //post createUsers
    createUsers({ body }, res) {
         User.create(body)
         .then(dbUserData => res.json(dbUserData))
         .catch(err => res.status(400).json(err));
     },
    
    //get Users by single id
    // fixed typo extra s
    getUsersById({params}, res) {
        User.findOne({_id: params.id})
        .populate({path: 'thoughts', select: '-__v'})
        .populate({path: 'friends', select: '-__v'})
        .select('-__v')
        // return if no Users is found 
        .then(dbUserssData => {
            if(!dbUserssData) {
                res.status(404).json({message: 'No Users with this particular ID!'});
                return; 
            }
            res.json(dbUserssData)
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
        .then(dbUsersData => res.json(dbUsersData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        })
    },
     //updating Users with params
     updateUsers({params, body}, res) {
        //Users finds one id and updates to a new one
        User.findOneAndUpdate({_id: params.id}, body, {new: true, runValidators: true})
        .then(dbUserssData => {
            if(!dbUserssData) {
                res.status(404).json({message: 'Users not found with this id try again lol'});
                return;
            }
            res.json(dbUsersData);
        })
        .catch(err => res.json(err))
    },
     //deleting the Users by id
     deleteUsers({params}, res) {
        //find one Users and delete it by id
        User.findOneAndDelete({_id: params.id})
        .then(dbUserssData => {
            if(!dbUserssData) {
                res.status(404).json({message: 'Users not found with this id try again lol'});
                return;
            }
            res.json(dbUserssData);
        })
        .catch(err => res.status(400).json(err));
    },
      //delete friend 
      deleteFriend({ params }, res) {
        //find a Users and update it from the id
        User.findOneAndUpdate({_id: params.id}, {$pull: { friends: params.friendId}}, {new: true})
        .populate({path: 'friends', select: '-__v'})
        .select('-__v')
        .then(dbUserssData => {
            if(!dbUserssData) {
                res.status(404).json({message: 'Users not found with this id try again lol'});
                return;
            }
            res.json(dbUserssData);
        })
        .catch(err => res.status(400).json(err));
    }

};

// Export module Users controller
module.exports = UsersController; 