const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({

notificationSender: { 
    type: String,
},
notificationReceiver: { 
    type: String,
},
postId: { 
    type: String,
    default: null
},
conversationId: {
    type: String,
    default: null
},
text: { 
    type: String,
}
}, {timestamp: true});

const Notification = mongoose.model('Notification', notificationSchema)

module.exports = Notification