const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
{
    userId: { type: String, required: true},
    description: { type: String },
    photo: { type: String },
    likers:  { type: Array },
    comments:  { type: Array }
},
{ timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);