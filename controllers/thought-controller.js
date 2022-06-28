const { Thought, User } = require('../models');


const thoughtController = {
    // getAllThoughts DONE
    getAllThoughts(req, res) {
        Thought.find({})
        .select('-__v')
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });        
    },

    // getThoughtById DONE
    getThoughtById({params}, res) {
        Thought.findOne({ _id:params.id })
        .select('-__v')
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this ID!' });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    // createThought DONE
    createThought({ body }, res) {
        Thought.create(body)
        .then(dbThoughtData => {
            User.findOneAndUpdate(
                { username: dbThoughtData.username},
                { $push: { thoughts: dbThoughtData._id } },
                { new: true, runValidators: true }
            )
            .then(dbThoughtData => {
                res.json(dbThoughtData)
            })
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });        
    },

    // updateThoughtById DONE
    updateThoughtById({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true})
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this ID!' });
                return;
            }
            res.json(dbThoughtData)
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
    },

    // deleteThoughtById DONE
    deleteThoughtById({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this ID!' });
                return;
            }

            User.findOneAndUpdate(
                { username: dbThoughtData.username},
                { $pull: { thoughts: dbThoughtData._id } },
                { new: true, runValidators: true }
            )
            .then(dbThoughtData => res.json(dbThoughtData))
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });                
    },
    // createReaction
//    /api/thoughts/:thoughtId/reactions
createReaction({ params, body }, res) {
    console.log(params)
    Thought.findOneAndUpdate(
        { _id: params.thoughtId },
        { $push: { reactions: body } },
        { new: true, runValidators: true }
    )
    .then(dbThoughtData => {
        if (!dbThoughtData) {
            res.status(404).json({ message: 'No thought found with this id!' });
            return;
        }
        
        res.json(dbThoughtData);
    })
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    });           
},

    // deleteReactionById DONE
    deleteReactionById({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: body } },
            { new: true, runValidators: true }
        )
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({ message: 'No user found with this ID!' });
                return;
            };

            res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
    }

};

module.exports = thoughtController;