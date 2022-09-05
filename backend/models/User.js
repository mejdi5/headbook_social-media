const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
{
    userName: { type: String, required: true},
    email: { type: String, required: true, unique: true },
    profilePicture: { type: String, default: null },
    coverPicture: { type: String, default: null },
    description:  { type: String, default: "" },
    address: {
        country: { type: String, default: null },
        city: { type: String, default: null }
    },
    relationship: { type: String, default: null },
    job: { type: String, default: null },
    friends: { type: Array, default: [] }
},
{ timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);