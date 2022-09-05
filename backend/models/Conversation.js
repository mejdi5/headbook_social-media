const mongoose = require('mongoose');

const ConversationSchema = new mongoose.Schema({

    senderId: {
        type: String,
    },
    receiverId: {
        type: String,
    },
    lastMessage: {
        _id: {
            type: String
        },
        senderId: {
            type: String
        }, 
        text: {
            type: String,
        },
        date: {
            type: String,
        },
    }
},
{timestamp: true}
);

const Conversation = mongoose.model('Conversation', ConversationSchema);

module.exports = Conversation 