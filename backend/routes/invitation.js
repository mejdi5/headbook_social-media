const router = require('express').Router();
const Invitation = require('../models/Invitation');

//post new invitation
router.post("/", async (req, res)=> {
    const newInvitation = new Invitation(req.body)
    try {
        const invitation = await newInvitation.save()
        res.status(200).json(invitation)        
    } catch (error) {
        res.status(500).json(error)
    }
})

//get invitations of one user
router.get("/:userId", async (req, res)=> {
    try {
        const sentInvitations = await Invitation.find({
            senderId: req.params.userId,
        })
        const receivedInvitations = await Invitation.find({
            receiverId: req.params.userId,
        }) 
        const invitations = [...sentInvitations, ...receivedInvitations]
        res.status(200).json(invitations)
    } catch (error) {
        res.status(500).json(error)
    }
})

//delete invitation
router.delete('/:invitationId', async (req, res) => {
    try {
        const invitation = await Invitation.findOneAndDelete({ _id: req.params.invitationId });
        res.json({ msg: `invitation deleted`, invitation });
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;