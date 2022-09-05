import React,{FormEvent, useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import { useTypedDispatch, useTypedSelector } from '../../Redux/Hooks'
import { ConversationType } from '../../Redux/conversationSlice'
import { getAllChatbotConversationMessages, MessageType } from '../../Redux/messageSlice'
import { NotificationType } from '../../Redux/notificationSlice'
import { UserType } from '../../Redux/userSlice'
import { Axios } from '../../Axios'
import {AiOutlineSend, AiOutlineClose, AiOutlineMinus} from 'react-icons/ai'
import {VscChromeMaximize} from 'react-icons/vsc'
import { format } from 'timeago.js';
import { confirmAlert } from 'react-confirm-alert'; 
import { getHiddenChatbotConversations } from '../../Redux/conversationSlice'
import { 
    ChatbotCard,
    ChatHeader,
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
    DeleteError,
    ChatbotIcons,
    HideChatbot,
    CloseChatbot,
} from './ChatbotStyle'

interface Props {
    userChattingWith: UserType | null,
    chatbotConversation: ConversationType,
    handleRemoveChatbotConversation: (chatbotConversationId: string) => void
}

const SingleChatbot: React.FC<Props> = ({userChattingWith, chatbotConversation, handleRemoveChatbotConversation}) => {

    const users = useTypedSelector<UserType[] | never[]>(state => state.userSlice.users)
    const user = useTypedSelector<UserType | null>(state => state.userSlice.user)
    const socket = useTypedSelector<any>(state => state.socketSlice.socket)
    const notifications = useTypedSelector<NotificationType[] | never[]>(state => state.notificationSlice.notifications)
    const chatbotConversationMessages = useTypedSelector<MessageType[] | never[]>(state => state.messageSlice.chatbotConversationMessages)
    const dispatch = useTypedDispatch()
    const [text, setText] = useState("")
    const [msg, setMsg] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)
    const chatbotConversationNotification = notifications.find(notif => notif?.conversationId === chatbotConversation?._id)
    const hiddenChatbotConversations = useTypedSelector<ConversationType[] | never[]>(state => state.conversationSlice.hiddenChatbotConversations)


    const handlePostMessage = async (e: FormEvent) => {
        e.preventDefault()
        try {
            const newMessage = {
                conversationId: chatbotConversation?._id,
                senderId: user?._id,
                text
            }
            await Axios.post(`/messages`, newMessage)
            const res = await Axios.get(`/messages/${chatbotConversation?._id}`)
            dispatch(getAllChatbotConversationMessages([
                ...chatbotConversationMessages, 
                ...res.data.filter((message: MessageType) => !chatbotConversationMessages.some(m => m?._id === message?._id ))
            ]));
            socket?.emit("sendMessage", {newMessage, receiverId: chatbotConversation?.receiverId !== user?._id ? chatbotConversation?.receiverId : chatbotConversation?.senderId})
            if (!notifications.some(notif => notif.conversationId === chatbotConversation?._id)) {
                const newNotification = {
                    notificationSender: user?._id,
                    notificationReceiver: chatbotConversation?.receiverId !== user?._id ? chatbotConversation?.receiverId : chatbotConversation?.senderId,
                    conversationId: chatbotConversation?._id,
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

    useEffect(() => {
        const handleDeleteConversationNotification = async (id: string) => {
            try {
                await Axios.delete(`/notifications/${id}`)
            } catch (error) {
                console.log(error)
            }
        }
        chatbotConversationNotification?._id && 
        handleDeleteConversationNotification(chatbotConversationNotification?._id)
    }, [])

    //minimize chatbot conversation
    const handleHideChatbotConversation = (chatbotConversation: ConversationType) => {
        !hiddenChatbotConversations?.some(conv => conv?._id === chatbotConversation?._id) &&
        dispatch(getHiddenChatbotConversations([...hiddenChatbotConversations, chatbotConversation]))
    }

return (
<ChatbotCard>
        <ChatHeader>
            <ChatHeaderWrapper className="col-lg-6">
                <Link to={`/profile/${userChattingWith?._id}`}>
                    <ChatHeaderImage 
                    src={userChattingWith?.profilePicture || "/no-avatar.png"}
                    alt=""
                    />
                </Link>
                <Link to={`/profile/${userChattingWith?._id}`} style={{textDecoration:'none', color: 'black'}}>
                    <ChatHeaderUserName>
                        <ChatHeaderName className="m-b-0">{userChattingWith?.userName?.toUpperCase()}</ChatHeaderName>
                    </ChatHeaderUserName>
                </Link>
            </ChatHeaderWrapper>
            <ChatbotIcons>
                <HideChatbot onClick={() => handleHideChatbotConversation(chatbotConversation)}>
                    <AiOutlineMinus/>
                </HideChatbot>
                <CloseChatbot
                onClick={() => chatbotConversation?._id && handleRemoveChatbotConversation(chatbotConversation?._id)}>
                    <AiOutlineClose
                />
                </CloseChatbot>
            </ChatbotIcons>
        </ChatHeader>
        <ChatMessages>
            <MessageList className="m-b-0">
                {msg && <DeleteMsg>{msg}</DeleteMsg>}
                {chatbotConversationMessages && chatbotConversationMessages.length > 0 &&
                chatbotConversationMessages.filter((message: MessageType) => message.conversationId === chatbotConversation?._id)
                .map((message: MessageType) => {
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
                onClick={e => chatbotConversation?._id && handlePostMessage(e)}
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
</ChatbotCard>
)}

export default SingleChatbot