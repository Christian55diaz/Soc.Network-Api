//here we have to require thoughts and users
const {Thoughts, Users} = require('../models');

//make a thoughts controller 
const thoughtsController = {
    //new thought created
    createThoughts({params, body}, res) {
        //create thoughts in body then the id
        Thoughts.create(body)
        .then(({_id}) => {
            return Users.findOneAndUpdate({ _id: params.userId}, {$push: {thoughts: _id}}, {new: true});
        })
        .then(dbThoughtsData => {
            if(!dbThoughtsData) {
                res.status(404).json({message: 'thought not found with this id try again lol'});
                return;
            }
            res.json(dbThoughtsData)
        })
        .catch(err => res.json(err)); 
    },
}