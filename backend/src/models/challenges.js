import { Schema } from "mongoose";
const challengeSchema = new Schema({
  title: {
    type: String,
    required: true,
  },

  userId: [{ type: Schema.Types.ObjectId, ref: "User" }],

  startTime: {
    type: Date,
    required: true,
    default: Date.now,
  },

  endTime: {
    type: Date,
    required: true,
  },
});

const Challenge = mongoose.model("Challenge", challengeSchema);
export default Challenge;
