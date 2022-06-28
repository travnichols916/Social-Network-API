const router = require('express').Router();

const {
    getAllThoughts,
    createThought,
    getThoughtById,
    updateThoughtById,
    deleteThoughtById,
    createReaction,
    deleteReactionById
} = require('../../controllers/thought-controller');

// /api/thoughts
router
    .route('/')
    .get(getAllThoughts)
    .post(createThought)

// /api/thoughts/:id
router
    .route('/:id')
    .get(getThoughtById)
    .put(updateThoughtById)
    .delete(deleteThoughtById);
// /api/thoughts/:thoughtId/reactions
router
    .route('/:thoughtId/reactions')
    .post(createReaction)
    .delete(deleteReactionById)

    module.exports = router;