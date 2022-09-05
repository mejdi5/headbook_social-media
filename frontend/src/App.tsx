import React,{ useEffect, useState } from 'react';
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom'
import Home from './Pages/home/Home'
import Dashboard from './Pages/Dashboard';
import { useTypedDispatch, useTypedSelector } from './Redux/Hooks'
import { getAllInvitations, InvitationType } from './Redux/invitationSlice'
import { getAllUsers, getOnlineUsers, getUser, load, UserType } from './Redux/userSlice';
import Profile from './Pages/profile/Profile';
import Loading from './Pages/Loading';
import {Axios} from './Axios'
import { io } from "socket.io-client";
import {getSocket} from './Redux/socketSlice'
import { NotificationType, getAllNotifications } from './Redux/notificationSlice';
import SinglePost from './Pages/singlePost/SinglePost';
import { ConversationType, getAllUserConversations } from './Redux/conversationSlice';
import SingleConversation from './Pages/singleConversation/SingleConversation';
import { getAllConversationMessages, MessageType, getAllChatbotConversationMessages } from './Redux/messageSlice';


const App: React.FC = () => {

  const user = useTypedSelector<UserType | null>(state => state.userSlice.user)
  const users = useTypedSelector<UserType[] | never[]>(state => state.userSlice.users)
  const isLoading = useTypedSelector(state => state.userSlice.isLoading)
  const invitations = useTypedSelector<InvitationType[] | never[]>(state => state.invitationSlice.invitations)
  const notifications = useTypedSelector<NotificationType[] | never[]>(state => state.notificationSlice.notifications)
  const conversations = useTypedSelector<ConversationType[] | never[]>(state => state.conversationSlice.conversations)
  const messages = useTypedSelector<MessageType[] | never[]>(state => state.messageSlice.messages)
  const chatbotConversations = useTypedSelector<ConversationType[] | never[]>(state => state.conversationSlice.chatbotConversations)
    const chatbotConversationMessages = useTypedSelector<MessageType[] | never[]>(state => state.messageSlice.chatbotConversationMessages)
  const dispatch = useTypedDispatch()
  const socket = useTypedSelector<any>(state => state.socketSlice.socket)

  useEffect(() => {
    dispatch(load(false))
    user && dispatch(getSocket(io(process.env.NODE_ENV ==="production" ? "https://head-book.herokuapp.com/" : "http://localhost:5000")))
  }, []);

  useEffect(() => {
    if (user) {
      //online users
      socket?.emit("newUser", user?._id);
      socket?.on("getUsers", (Users: any) => {
        const onlineUsers = users?.filter(u => Users.some((onlineUser: any) => onlineUser?.userId === u?._id))
        dispatch(getOnlineUsers(onlineUsers))
        })
    }
  }, [socket, user]);

  //get invitations
  useEffect(() => {
    const getInvitations = async () => {
      const res = await Axios.get(`/invitations/${user?._id}`)
      dispatch(getAllInvitations(res.data));
    };
    user && getInvitations();
  }, [invitations])

  //post and get conversations
  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await Axios.get(`/conversations/${user?._id}`)
        dispatch(getAllUserConversations(res.data));
      } catch (error) {
        console.log(error)
      }
    };
    if(user) {
      getConversations();
    }
  }, [conversations])

  //get message
  useEffect(() => {
  socket?.on("getMessage", async (newMessage: MessageType) => {
    dispatch(getAllConversationMessages([...messages.filter(m => m?._id !== newMessage?._id), newMessage]))
    if (chatbotConversations.some(conv => conv?._id === newMessage.conversationId)) {
      const chatbotConversation = chatbotConversations.find(conv => conv?._id === newMessage.conversationId)
      const res = await Axios.get(`/messages/${chatbotConversation?._id}`)
      dispatch(getAllChatbotConversationMessages([
          ...chatbotConversationMessages, 
          ...res.data.filter(message => !chatbotConversationMessages.some(m => m?._id === message?._id ))
      ]));
    }
  })
  }, [socket, messages, user])

  //get notifications
  useEffect(() => {
    const handleGetNotification = async () => {
    try {
      socket?.on("getNotification", (newNotification: NotificationType) => {
        !notifications.some(notif => notif?._id === newNotification?._id) &&
        dispatch(getAllNotifications([...notifications, newNotification]))
      })
      const res = await Axios.get(`/notifications/${user?._id}`)
      dispatch(getAllNotifications(res.data));
    } catch (error) {
      console.log(error)
    }
    }
    user && handleGetNotification();
  }, [socket, user, notifications])

  //set user friends
  useEffect(() => {
    const friends = users?.filter(u => u?.friends?.some(id => id === user?._id))
    user && friends.map(async (friend) => {
      try {
        if(!user?.friends.some(friendId => friendId === friend?._id)) {
        const res = await Axios.put(`/users/${user?._id}`, {friends: user && [...user?.friends, friend?._id]})
        dispatch(getUser(res.data.editedUser))
        }
      } catch (error) {
        console.log(error)
      }
    })
    user && user?.friends?.map(async (id) => {
      try {
        if (!users?.some(u => u?._id === id)) {
          const res = await Axios.put(`/users/${user?._id}`, {friends: user?.friends.filter(friendId => friendId !== id)})
          dispatch(getUser(res.data.editedUser))
        }
      } catch (error) {
        console.log(error)
      }
    })
}, [user, users])



return (
<BrowserRouter>
    <Routes>
      <Route path="/" element={
        user 
        ? 
        <Dashboard/>
        : !isLoading ?
        <Home/>
        :
        <Loading/>
      }/>
      <Route path="/profile/:userId" element={
        user
        ?
        <Profile/>
        : !isLoading ?
        <Navigate to="/"/>
        : 
        <Loading/>
      }/>
      <Route path="/post/:postId" element={
        user 
        ?
        <SinglePost/>
        : !isLoading ?
        <Navigate to="/"/>
        :
        <Loading/>
      }/>

    <Route path="/conversation/:conversationId" element={
        user 
        ?
        <SingleConversation/>
        : !isLoading ?
        <Navigate to="/"/>
        :
        <Loading/>
      }/>
    </Routes>
</BrowserRouter>
)}

export default App;
