const mongoose = require('mongoose');

const invitationSchema = new mongoose.Schema({

senderId: { 
    type: String,
},
receiverId: { 
    type: String,
}
}, {timestamp: true});

const Invitation = mongoose.model('Invitation', invitationSchema)
module.exports = Invitation