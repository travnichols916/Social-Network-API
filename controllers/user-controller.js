const { Thought, User } = require('../models/');

const { param } = require('express/lib/request');
const { regexpToText } = require('nodemon/lib/utils');


const userController = {
    // getAllUsers
  getAllUsers(req, res) {
      User.find({})
      .populate({
          path: 'thoughts',
          select: '-__v'
      })
      .populate({
          path: 'friends',
          select: '-__v'
      })
      .select('-__v')
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },


    // getUsersById
    getUsersById({ params }, res) {
        User.findOne({_id: params.id})
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .populate({
            path: 'friends',
            select: '-__v'
        })
        .select('-__v')
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this ID!' });
                return;
            }
            
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });        
    },


    // createUser,
    createUser({ body }, res) {
        User.create(body)
          .then(dbUserData => res.json(dbUserData))
          .catch(err => res.json(err));
      },
    // updateUserById,
    updateUserById({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true})
        .then(dbUserData=> {
            if (!dbUserData) {
                res.status(404).json({ message: 'No User found with this ID!' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err =>{
            console.log(err);
            res.status(400).json(err);
        });
    },
    // deleteUserById,
    deleteUserById({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
        .then(dbUserData => {
            if (!dbUserData){
                res.status(404).json({ message: 'No User found with this ID!' });
                return;
            }
            Thought.deleteMany({ username: dbUserData.username })
            .then(dbUserData => res.json(dbUserData))
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
    },
    // addFriendToList
    
    addFriendToList({ params }, res) {
        User.findOneAndUpdate({ _id: params.id },
            {$push: { friends: params.friendId}},
            { new: true, runValidators: true} 
            )
            .then(dbUserData => {
                if(!dbUserData){
                    res.status(404).json({ message: 'No user foudn with this ID!'});
                    return;
                };
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },
    // deleteFriendFromList
    deleteFriendFromList({ params}, res){
        User.findOneAndUpdate(
            { _id: params.userId},
            { $pull: { friends: params.friendId}},
            { new: true, runValidators: true }
            
            )
            .then(dbUserData => {
                if(!dbUserData){
                    res.status(404).json({ message: 'No User found with this ID!'});
                    return;
                };
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    }
}
    module.exports = userController
