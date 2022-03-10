const router = require ('express').Router();

const {
    getAllUsers,
    getUsersById,
    createUsers,
    updateUsers,
    deleteUsers,
    addFriend,
    deleteFriend
    } = require('../../controllers/usercontroller');

//routes to the home address
// route to get all users and route to create users
    router
    .route('/')
    .get(getAllUsers)
    .post(createUsers);
// routes that go to the params of id
// route to get user by id, update users by id and delete users by id
    router
    .route('/:id')
    .get(getUsersById)
    .put(updateUsers)
    .delete(deleteUsers)

// routes for the friends params
// route to add a friend for a user and route to delete a friend from a user
// add friend is not finished yet
    // router
    // .route('/:userId/friends/:friendId')
    // .post(addFriend)
    // .delete(deleteFriend)

// export router
    module.exports = router;