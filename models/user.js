const { Schema, model } = require('mongoose');

const UsersSchema = new Schema({

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
      ref: "Users",
    },
  ],
});

// whole count of friends
UsersSchema.virtual('friendCount').get(function() {
    return this.friends.length;
})

// model being created by the shcema
const Users = model('Users', UsersSchema);

// Export Users module
module.exports = Users;