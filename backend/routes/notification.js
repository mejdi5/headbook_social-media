const router = require('express').Router();
const Notification = require('../models/Notification');


//post new notification
router.post("/", async (req, res)=> {
    const newNotification = new Notification(req.body)
    try {
        const notification = await newNotification.save()
        res.status(200).json(notification)        
    } catch (error) {
        res.status(500).json(error)
    }
})

//get notifications of one user
router.get("/:userId", async (req, res)=> {
    try {
        const sentNotifications = await Notification.find({
            notificationSender: req.params.userId,
        })
        const receivedNotifications = await Notification.find({
            notificationReceiver: req.params.userId,
        }) 
        const notifications = [...sentNotifications, ...receivedNotifications]
        res.status(200).json(notifications)
    } catch (error) {
        res.status(500).json(error)
    }
})

//delete notification
router.delete('/:notificationId', async (req, res) => {
    try {
        const notification = await Notification.findOneAndDelete({ _id: req.params.notificationId });
        res.json({ msg: `notification deleted`, notification });
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;