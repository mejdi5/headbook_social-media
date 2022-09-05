const router = require('express').Router();
const Message = require('../models/Message');
const Conversation = require('../models/Conversation');
const crypto = require("crypto");


//post new message
router.post("/", async (req, res)=> {
    const newMessage = new Message(req.body)
    try {
        const savedMessage = await newMessage.save()  
        await Conversation.findOneAndUpdate(
            {_id: savedMessage.conversationId}, 
            {$set: {
                lastMessage: {
                    _id: savedMessage._id,
                    senderId: savedMessage.senderId,
                    text: savedMessage.text,
                    date: savedMessage.date
                }
            }}, 
            { new: true }
        )
        res.status(200).json(savedMessage) 
    } catch (error) {
        console.log(error.message)
        res.status(500).json(error.message)
    }
}) 

//get messages of a conversation
router.get("/:conversationId", async (req, res)=> {
    try {
        let messages = await Message.find({
            conversationId: req.params.conversationId,
        })
        messages = messages.map(msg => {
            return msg
        })
        res.status(200).json(messages)
    } catch (error) {
        console.log(error.message)
        res.status(500).json(error.message)
    }
})


// delete a message
router.delete('/:messageId', async (req, res) => {
    try {
    const message = await Message.findOneAndDelete({ _id: req.params.messageId });
    await Conversation.findOneAndUpdate(
        {_id: message.conversationId}, 
        {$set: {
            lastMessage: null
        }}, 
        { new: true }
    )
    const lastMessage = await Message.find({conversationId: message.conversationId}).sort({ $natural: -1 }).limit(1)
    lastMessage.length > 0 && 
    await Conversation.findOneAndUpdate(
        {_id: message.conversationId}, 
        {$set: {
            lastMessage: lastMessage[0]
        }}, 
        { new: true }
    )
    res.status(200).json({ msg: "message deleted"});
    } catch (error) {
    console.log(error);
    }
});

module.exports = router;