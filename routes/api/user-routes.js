const router = require('express').Router();

const {
    getAllUsers,
    getUsersById,
    createUser,
    updateUserById,
    deleteUserById,
    addFriendToList,
    deleteFriendFromList
} = require('../../controllers/user-controller');

// /api/users
router
    .route('/')
    .get(getAllUsers)
    .post(createUser)

// /api/users/:id
router
    .route('/:id')
    .get(getUsersById)
    .put(updateUserById)
    .delete(deleteUserById);

// api/users/:userId/friends/:friendId
router
    .route('/:userId/friends/:friendId')
    .post(addFriendToList)
    .delete(deleteFriendFromList)

module.exports = router;