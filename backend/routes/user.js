const router = require("express").Router();
const User = require("../models/User");
const Conversation = require("../models/Conversation");

//POST NEW User 
router.post("/", async (req, res) => {
    const newUser = new User({
        userName: req.body.userName,
        email: req.body.email,
        profilePicture: req.body.profilePicture,
        coverPicture: req.body.coverPicture,
        relationship: req.body.relationship,
        description: req.body.description,
        job: req.body.job,
        friends: []
    });
    try {
        const savedUser = await newUser.save();
        //post conversations with other users
        const users = await User.find()
        users.map(async (user) => {
            const newConversation = new Conversation({
                senderId: savedUser?._id,
                receiverId: user?._id
            })
            const firstCheckConversation = await Conversation.findOne({
                senderId: newConversation.senderId ,
                receiverId: newConversation.receiverId
            }) 
            const secondCheckConversation =  await Conversation.findOne({
                senderId: newConversation.receiverId,
                receiverId: newConversation.senderId 
            })
            if (!firstCheckConversation && !secondCheckConversation) {
                await newConversation.save()
            }
        })
        res.status(200).json({savedUser, msg: `${savedUser.userName} is registered with success`});
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
});

//login
router.get("/:email", async (req, res) => {
    try {
        const user = await User.findOne({email: req.params.email});
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json(error);
    }
});

//GET ALL USERS
router.get("/", async (req, res) => {
    try {
        const users = await User.find().sort({ createdAt: -1 })
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json(error);
    }
});

//EDIT USER
router.put('/:userId', async (req, res) => {
    try {
        const editedUser = await User.findByIdAndUpdate(
            req.params.userId, 
            {$set: req.body}, 
            { new: true }
        )
        res.status(200).json({msg: "Profile edited..", editedUser});
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
})


//DELETE USER
router.delete("/:userId", async (req, res) => {
    try {
        const deletedUser = await User.findOneAndDelete({_id: req.params.userId});
            res.status(200).json({msg:`${deletedUser.userName} has been deleted...`, deletedUser});
    } catch (error) {
        res.status(500).json(error);
    }
});


module.exports = router;