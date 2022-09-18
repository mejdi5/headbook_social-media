const express = require('express')
const app = express()
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require('body-parser');


dotenv.config();
//database connection
mongoose
    .connect(process.env.MONGO_URI) 
    .then(() => console.log("Database connected.."))
    .catch((error) => {
    console.log(error, "Database is not connected..");
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())
app.use(express.json())


app.use("/api/users", require("./backend/routes/user"));
app.use("/api/posts", require("./backend/routes/post"));
app.use("/api/invitations", require("./backend/routes/invitation"));
app.use("/api/notifications", require("./backend/routes/notification"));
app.use("/api/conversations", require("./backend/routes/conversation"));
app.use("/api/messages", require("./backend/routes/message"));


const server = app.listen(process.env.PORT || 5000, () => {
    console.log("server is running!!");
});

let Users = [];


const addNewUser = (userId, socketId) => {
    !Users.some((user) => user.userId === userId) &&
    Users.push({ userId, socketId });
};

const removeUser = (socketId) => {
Users = Users.filter((user) => user.socketId !== socketId);
};


const io = require("socket.io")(server, {
    cors: {
        origin: "*", 
    },
});


io.on("connection", (socket) => {

    console.log("a user connected!");

    socket.on("newUser", (userId) => {
        addNewUser(userId, socket.id);
        io.emit("getUsers", Users);
        console.log('online:',Users.length)
    });

    //send and get notification
    socket.on("sendNotification", (newNotification) => {
        const user = Users?.find(u => u.userId === newNotification.notificationReceiver);  
        io.to(user?.socketId).emit("getNotification", newNotification)
    })

    //send and get message
    socket.on("sendMessage", ({newMessage, receiverId}) => {
        console.log('receiverId', receiverId)
    const user = Users?.find(u => u.userId === receiverId);
    io.to(user?.socketId).emit("getMessage", newMessage)
    });
    
    socket.on("disconnect", () => {
        console.log("a user disconnected!");
        removeUser(socket.id);
    });
});
