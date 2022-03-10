const { Schema, model, Types } = require('mongoose');

const ReactionsSchema = new Schema(
    {
        //Use Mongoose's ObjectId data type
        //Default value is set to a new ObjectId
        reactionId: {
            type: Schema.Types.ObjectId,
            default: ()=> new Types.ObjectId()
        },
        //set reactionBody with string, require and 280 character max
        reactionBody: {
            type: String,
            required: true,
            // for maxLength you can also use mongoose-Validator but we will not be using that practice today.
            maxLength: 280
        },
        //username string & required
        username:{
            type: String,
            required: true
        },
        //createdat trying to find out the date and set the default timestamp
      createdAt: {
          type: Date,
          default: Date.now,
          timestamps: { currentTime: () => Math.floor(Date.now() / 1000) }
      }  
    }
);
// making the thoughts schema
const ThoughtSchema = new Schema({
    thoughtText: {
      type: String,
      maxlength: 280,
      required: [true, "Must be at around 280 chars long"],
    },
    createdAt: {
        type: Date,
        default: Date.now,
        timestamps: { currentTime: () => Math.floor(Date.now() / 1000) },
      },
      username: {
        type: String,
        required: [true, "A username is required"],
      },
      reactions: [ReactionsSchema],
    });
    // making a virtual for the reaction count
    ThoughtSchema.virtual("reactionCount").get(function () {
      return this.reaction.length;
    });
    // export the model
    const Thought = model("Thought", ThoughtSchema);
    
    module.exports = Thought;