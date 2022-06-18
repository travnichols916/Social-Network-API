const { Schema, model, Types } = require('mongoose');

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      match: [/^.+@.+\..+$/, `Please enter a valid email address!`]
  },
  thoughts: [
    {
        type: Schema.Types.ObjectId,
        ref: 'Thought'
    }
],
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
);
// returns the number of friends
userSchema.virtual('totalNumberOfFriends')
    .get(function() {
        return this.friends.length;
    });

const User = model('User', userSchema);

module.exports = User
