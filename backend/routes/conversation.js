const router = require('express').Router();
const Conversation = require('../models/Conversation');


//get all conversations of one user
router.get("/:userId", async (req, res)=> {
    try {
        const sentConversations = await Conversation.find({
            senderId: req.params.userId,
            receiverId: {$ne: req.params.userId} 
        }) 
        const receivedConversations = await Conversation.find({
            receiverId: req.params.userId,
            senderId: {$ne: req.params.userId}
        })
        const autoConversation = await Conversation.find({
            receiverId: req.params.userId,
            senderId: req.params.userId
        })
        const conversations = [...sentConversations, ...receivedConversations, ...autoConversation]
        res.status(200).json(conversations)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

//GET one conversation
router.get("/conversation/:conversationId", async (req, res) => {
    try {
        const conversation = await Conversation.findOne({_id: req.params.conversationId});
        res.status(200).json(conversation);
    } catch (error) {
        res.status(500).json(error);
    }
});


// delete a conversation
router.delete('/:conversationId', async (req, res) => {
    const  _id  = req.params.conversationId;
    try {
    const conversation = await Conversation.findOneAndDelete({ _id });
    res.status(200).json({ msg: "conversation deleted", conversation });
    } catch (error) {
    console.log('error:', error);
    }
});

module.exports = router