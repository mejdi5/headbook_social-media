import React,{FormEvent, useEffect, useState} from 'react'
import { useParams, Link } from 'react-router-dom'
import { useTypedDispatch, useTypedSelector } from '../../Redux/Hooks'
import { ConversationType, getConversation } from '../../Redux/conversationSlice'
import Chatbots from '../../Components/chatbots/Chatbots'
import { getAllConversationMessages, MessageType } from '../../Redux/messageSlice'
import { NotificationType } from '../../Redux/notificationSlice'
import { UserType } from '../../Redux/userSlice'
import Navbar from '../../Components/navbar/Navbar'
import Leftbar from '../../Components/leftbar/Leftbar'
import { getAllChatbotConversationMessages } from '../../Redux/messageSlice'
import { Axios } from '../../Axios'
import {AiOutlineSend} from 'react-icons/ai'
import { format } from 'timeago.js';
import { confirmAlert } from 'react-confirm-alert'; 
import { Container, 
    LeftSide, 
    ConversationContainer, 
    ConversationWrapper, 
    ConversationCard,
    Chat,
    ChatHeader,
    ChatHeaderContent,
    ChatHeaderWrapper,
    ChatHeaderImage,
    ChatHeaderUserName,
    ChatHeaderName,
    ChatMessages,
    MessageList,
    SentMessageItem, 
    ReceivedMessageItem, 
    MessageItemWrapper,
    MessageText,
    MessageDate,
    SenderImage,
    ChatFooter,
    ChatFooterWrapper,
    ChatFooterInput,
    SendMessage, 
    DeleteMsg,
    DeleteError
} from './SingleConversationStyle'



const SingleConversation: React.FC = () => {

    const users = useTypedSelector<UserType[] | never[]>(state => state.userSlice.users)
    const user = useTypedSelector<UserType | null>(state => state.userSlice.user)
    const socket = useTypedSelector<any>(state => state.socketSlice.socket)
    const notifications = useTypedSelector<NotificationType[] | never[]>(state => state.notificationSlice.notifications)
    const currentConversation = useTypedSelector<ConversationType | null>(state => state.conversationSlice.conversation)
    const chatbotConversationMessages = useTypedSelector<MessageType[] | never[]>(state => state.messageSlice.chatbotConversationMessages)
    const conversationId = useParams().conversationId
    const messages = useTypedSelector<MessageType[] | never[]>(state => state.messageSlice.messages)
    const dispatch = useTypedDispatch()
    const userChattingWith = users.filter(u => u?._id !== user?._id).find(u => u._id === currentConversation?.senderId || u?._id === currentConversation?.receiverId) || user
    const [text, setText] = useState("")
    const [msg, setMsg] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)
    const currentConversationNotification = notifications.find(notif => notif?.conversationId === currentConversation?._id)
    const chatbotConversations = useTypedSelector<ConversationType[] | never[]>(state => state.conversationSlice.chatbotConversations)


    const handlePostMessage = async (e: FormEvent) => {
        e.preventDefault()
        try {
            const newMessage = {
                conversationId,
                senderId: user?._id,
                text
            }
            await Axios.post(`/messages`, newMessage)
            const res = await Axios.get(`/messages/${newMessage?.conversationId}`)
            console.log(res.data)
            dispatch(getAllChatbotConversationMessages(res.data));
            socket?.emit("sendMessage", {newMessage, receiverId: currentConversation?.receiverId !== user?._id ? currentConversation?.receiverId : currentConversation?.senderId})
            if (!notifications.some(notif => notif.conversationId === currentConversation?._id)) {
                const newNotification = {
                    notificationSender: user?._id,
                    notificationReceiver: currentConversation?.receiverId !== user?._id ? currentConversation?.receiverId : currentConversation?.senderId,
                    conversationId: currentConversation?._id,
                    text: `${user?.userName?.toUpperCase()} sent you a message.`
                }
                await Axios.post('/notifications', newNotification)
                socket?.emit("sendNotification", newNotification)
            }
        } catch (error) {
            console.log(error)
        }
        setText("")
    }

    useEffect(() => {
    const getCurrentConversation = async () => {
        try {
            const res = await Axios.get(`/conversations/conversation/${conversationId}`)
            dispatch(getConversation(res.data));
        }
        catch (error) {
            console.log(error)
        }}
    getCurrentConversation();
    }, [currentConversation])


    useEffect(() => {
    const getCurrentConversationMessages = async () => {
        try {
            const res = await Axios.get(`/messages/${conversationId}`)
            dispatch(getAllConversationMessages(res.data));
        }
        catch (error) {
            console.log(error)
        }}
        getCurrentConversationMessages()
    }, [messages])

    useEffect(() => {
        const handleDeleteConversationNotification = async (id: string) => {
            try {
                await Axios.delete(`/notifications/${id}`)
            } catch (error) {
                console.log(error)
            }
        }
        currentConversationNotification?._id && 
        handleDeleteConversationNotification(currentConversationNotification?._id)
    }, [])

    const handleDeleteMessage = async (id: string) => {
        try {
            await Axios.delete(`/messages/${id}`)
            dispatch(getAllChatbotConversationMessages(chatbotConversationMessages.filter(message => message?._id !== id)))
            setMsg('message deleted..')
            setTimeout(() => {
                setMsg(null)
            }, 3000)
        } catch (err) {
            setError("cannot delete !!")
            setTimeout(() => {
                setError(null)
            }, 4000)
        }
    } 


    const confirmDeletingMessage = (id: string) => {
        confirmAlert({
            message: 'Delete Message ?',
            buttons: [
            {
                label: 'Yes',
                onClick: () => handleDeleteMessage(id)
            },
            {
                label: 'No',
            }
        ],
        closeOnClickOutside: true
        });
    };
    


return (
<>
    <Navbar />
    <Container>
        <LeftSide>
            <Leftbar/>
        </LeftSide>
        <ConversationContainer>
            {currentConversation && 
            <ConversationWrapper className="row clearfix">
                <div className="col-lg-12">
                    <ConversationCard>
                        <Chat>
                            <ChatHeader>
                                <ChatHeaderContent className="row">
                                    <ChatHeaderWrapper className="col-lg-6">
                                        <Link to={`/profile/${userChattingWith?._id}`}>
                                            <ChatHeaderImage 
                                            src={userChattingWith?.profilePicture || "/no-avatar.png"}
                                            alt=""
                                            />
                                        </Link>
                                        <Link to={`/profile/${userChattingWith?._id}`} style={{textDecoration:'none', color: 'black'}}>
                                            <ChatHeaderUserName>
                                                <ChatHeaderName className="m-b-0">{userChattingWith?.userName}</ChatHeaderName>
                                            </ChatHeaderUserName>
                                        </Link>
                                    </ChatHeaderWrapper>
                                </ChatHeaderContent>
                            </ChatHeader>
                            <ChatMessages className="chat-history">
                                <MessageList className="m-b-0">
                                    {msg && <DeleteMsg>{msg}</DeleteMsg>}
                                    {messages.map((message: MessageType) => {
                                    if (message.senderId === user?._id) {
                                    return (
                                    <SentMessageItem 
                                    key={message._id} 
                                    onClick={() => message?._id && confirmDeletingMessage(message?._id)}
                                    >
                                        <MessageItemWrapper className="message-data text-right" style={{backgroundColor:'rgb(161, 186, 224)'}}>
                                            <SenderImage
                                            src={user?.profilePicture || "/no-avatar.png"}
                                            alt=""
                                            />
                                            <MessageText className="message other-message float-right"> 
                                                {message.text}
                                            </MessageText>
                                            <MessageDate className="message-data-time">{format(message.date)}</MessageDate>
                                        </MessageItemWrapper>
                                        {error && <DeleteError>{error}</DeleteError>}
                                    </SentMessageItem>
                                    )} else {
                                        const sender = users.find(u => u?._id === message.senderId)
                                    return (
                                    <ReceivedMessageItem key={message._id}>
                                        <MessageItemWrapper className="message-data text-right" style={{backgroundColor:'rgb(204, 197, 197)'}}>
                                            <MessageDate className="message-data-time">{format(message.date)}</MessageDate>
                                            <MessageText className="message other-message float-right"> 
                                                {message.text}
                                            </MessageText>
                                            <SenderImage
                                            src={sender?.profilePicture || "/no-avatar.png"}
                                            alt=""
                                            />
                                        </MessageItemWrapper>
                                    </ReceivedMessageItem>
                                    )}
                                    })}
                                </MessageList>
                            </ChatMessages>
                            <ChatFooter>
                                <ChatFooterWrapper className="input-group mb-0">
                                    <SendMessage 
                                    className="input-group-text" 
                                    onClick={e => handlePostMessage(e)}
                                    >
                                        <AiOutlineSend/>
                                    </SendMessage>
                                    <ChatFooterInput 
                                    type="text" 
                                    placeholder="Enter text here..."
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                    />                                    
                                </ChatFooterWrapper>
                            </ChatFooter>
                        </Chat>
                    </ConversationCard>
                </div>
            </ConversationWrapper>
        }
        </ConversationContainer>
        {chatbotConversations && <Chatbots/>}
    </Container>
</>
)}

export default SingleConversation