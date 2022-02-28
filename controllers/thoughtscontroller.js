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
    //get all the thoughts
    getAllThoughts(req,res) {
        Thoughts.find({})
        .populate({path: 'reactions', select: '-__v'})
        .select('-__v')
        // .sort({_id: -1})
        .then(dbThoughtsData => res.json(dbThoughtsData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    // find one specific thought
    getThoughtsById({params}, res) {
        //thought find one
    Thoughts.findOne({ _id: params.id })
    .populate({path: 'reactions',select: '-__v'})
    .select('-__v')
    .then(dbThoughtsData => {
        if(!dbThoughtsData) {
        res.status(404).json({message: 'thought not found with this id try again lol'});
        return;
    }
    res.json(dbThoughtsData)
    })
    .catch(err => {
        console.log(err);
        res.sendStatus(400);
    });
},
 // here we are deleting a single thought by a specific id
 deleteThoughts({params}, res) {
    Thoughts.findOneAndDelete({_id: params.id})
    .then(dbThoughtsData => {
        if (!dbThoughtsData) {
            //if route is executed wrong then a failed message with be shown saying""
            res.status(404).json({message: 'thought not found with this id try again lol'});
            return;
        }
        res.json(dbThoughtsData);
        })
        .catch(err => res.status(400).json(err));
},
// updating the thoughts by the specifc id to a new id
updateThoughts({params, body}, res) {
    Thoughts.findOneAndUpdate({_id: params.id}, body, {new: true, runValidators: true})
    .populate({path: 'reactions', select: '-__v'})
    .select('-___v')
    .then(dbThoughtsData => {
        if (!dbThoughtsData) {
            res.status(404).json({message: 'No thoughts with this particular ID!'});
            return;
        }
            res.json(dbThoughtsData);
    })
    .catch(err => res.json(err));
}

};
// exporting the module thought controller
module.exports = thoughtsController;