const { Schema, model } = require('mongoose');

const UserSchema = new Schema({

    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        //regex to validate email address
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },

thoughts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Thoughts",
    },
  ],
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

// whole count of friends
UsersSchema.virtual('friendCount').get(function() {
    return this.friends.length;
})

// model being created by the shcema
const users = model('user', UsersSchema);

// Export Users module
module.exports = users;