const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({

    conversationId: {
        type: String,
    },
    senderId: {
        type: String
    }, 
    text: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        default: Date.now,
    }

},{timestamp: true});

const Message =  mongoose.model('Message', messageSchema)

module.exports = Message 