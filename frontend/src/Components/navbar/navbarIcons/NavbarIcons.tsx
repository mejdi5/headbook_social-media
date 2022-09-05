import React,{FormEvent, useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { FaUserAlt } from 'react-icons/fa'
import { BsFillChatDotsFill } from 'react-icons/bs'
import { IoIosNotifications } from 'react-icons/io'
import { useTypedDispatch, useTypedSelector } from '../../../Redux/Hooks'
import { UserType } from '../../../Redux/userSlice'
import { ConversationType } from '../../../Redux/conversationSlice'
import { NotificationType } from '../../../Redux/notificationSlice'
import { NavIcons, 
    NavIcon, 
    AlertList, 
    AlertWrapper, 
    ConversationList, 
    ConversationWrapper, 
    ChatWith,
    ChatWithImage,
    ChatWithText,
    LastMessage, 
    AlertImage, 
    AlertText, 
    NoAlerts, 
    Badge 
} from './NavbarIconsStyle'
import { Axios } from '../../../Axios'


const Navbar: React.FC = () => {

  const dispatch = useTypedDispatch()
  const users = useTypedSelector<UserType[] | never[]>(state => state.userSlice.users)
  const user = useTypedSelector<UserType | null>(state => state.userSlice.user)
  const [invitationAlertShow, setInvitationAlertShow] = useState(false)
  const [notificationAlertShow, setNotificationAlertShow] = useState(false)
  const [messageAlertShow, setMessageAlertShow] = useState(false)
  const notifications = useTypedSelector<NotificationType[] | never[]>(state => state.notificationSlice.notifications)
  const conversations = useTypedSelector<ConversationType[] | never[]>(state => state.conversationSlice.conversations)
  const receivedInvitationNotifications = notifications?.filter(notif => (notif?.notificationReceiver === user?._id) && !notif.postId && !notif.conversationId)
  const receivedPostNotifications = notifications?.filter(notif => (notif?.notificationReceiver === user?._id) && notif.postId)
  const receivedConversationNotifications = notifications?.filter(notif => (notif?.notificationReceiver === user?._id) && notif.conversationId)
  const navigate = useNavigate()


    const handleDeleteNotification = async (e: FormEvent, id: string) => {
        e.preventDefault();
        try {
            await Axios.delete(`/notifications/${id}`)
        } catch (error) {
            console.log(error)
        }
    }

return (
<NavIcons>
    {/*friendship invitation */}
    <NavIcon>
            <FaUserAlt onClick={() => {
                setInvitationAlertShow(!invitationAlertShow);
                setMessageAlertShow(false)
                setNotificationAlertShow(false)
            }}/>
            {receivedInvitationNotifications?.length > 0 && 
            <Badge onClick={() => {
                setInvitationAlertShow(!invitationAlertShow);
                setMessageAlertShow(false)
                setNotificationAlertShow(false)
            }}>
                {receivedInvitationNotifications?.length}
            </Badge>
            }
        <AlertList style={invitationAlertShow? {display: 'block'} : {display: 'none'}}>
        {receivedInvitationNotifications.length > 0 
        ?
        receivedInvitationNotifications
        .map((notif) => {
        const sender = users.find(u => u?._id === notif?.notificationSender)
        return (
            <AlertWrapper key={notif?._id} onClick={(e) => {
                navigate(`/profile/${sender?._id}`);
                notif?._id && handleDeleteNotification(e, notif?._id)}
            }>
                <AlertImage src={sender?.profilePicture ? sender?.profilePicture : "/no-avatar.png"}/>
                <AlertText>{notif?.text}</AlertText>
            </AlertWrapper>
        )})
        : <NoAlerts>No invitations</NoAlerts>
        }
        </AlertList>
    </NavIcon>
    {/*messages*/}
    <NavIcon>
        <BsFillChatDotsFill
        onClick={() => {
            setMessageAlertShow(!messageAlertShow);
            setInvitationAlertShow(false);
            setNotificationAlertShow(false);
        }}
        />
        {receivedConversationNotifications?.length > 0 && 
            <Badge onClick={() => {
            setMessageAlertShow(!messageAlertShow)
            setInvitationAlertShow(false);
            setNotificationAlertShow(false)
            }}>
                {receivedConversationNotifications?.length}
            </Badge>
            }
        <ConversationList style={messageAlertShow? {display: 'block'} : {display: 'none'}}>
        {(conversations?.length > 0)
        ?
        conversations
        .filter(conv => conv.lastMessage)
        .map((conv) => {
            const userToChatWith = users
            .filter(u => u?._id !== user?._id)
            .find(u => u._id === conv?.senderId || u?._id === conv?.receiverId) || user
            const conversationNotification = notifications.find(notif => notif?.conversationId === conv._id && notif?.notificationReceiver === user?._id )
            return (
            <ConversationWrapper 
            style={conversationNotification && {backgroundColor: 'lightblue'}}
            key={conv?._id} 
            onClick={(e) => {
                navigate(`/conversation/${conv?._id}`);
            }}
            >
                <ChatWith>
                    <ChatWithImage src={userToChatWith?.profilePicture ? userToChatWith?.profilePicture : "/no-avatar.png"}/>
                    <ChatWithText>{userToChatWith?.userName}</ChatWithText>
                </ChatWith>
                <LastMessage>{conv?.lastMessage?.text}</LastMessage>
            </ConversationWrapper>
        )
        })
        : <NoAlerts>No Conversations</NoAlerts>
        }
        </ConversationList>
    </NavIcon>
    {/*notification*/}
    <NavIcon>
        <IoIosNotifications 
        style={{fontSize: '20px'}}
        onClick={() => {
            setNotificationAlertShow(!notificationAlertShow);
            setMessageAlertShow(false)
            setInvitationAlertShow(false)
        }}
        />
        {receivedPostNotifications.length > 0 &&
        <Badge 
        onClick={() => {
            setNotificationAlertShow(!notificationAlertShow);
            setMessageAlertShow(false)
            setInvitationAlertShow(false)
        }}
        style={{top:'0', right:'0'}}
        >
            {receivedPostNotifications.length}
        </Badge>
        }
        <AlertList style={notificationAlertShow? {display: 'block'} : {display: 'none'}}>
            {receivedPostNotifications.length > 0
            ?
            receivedPostNotifications
            .map((notif, index) => {
                const sender = users?.find(u => u?._id === notif?.notificationSender)
            return (
            <AlertWrapper key={index} onClick={(e) => {
                notif.postId && navigate(`/post/${notif?.postId}`);
                notif?._id && handleDeleteNotification(e, notif?._id)}
            }>
                <AlertImage src={sender?.profilePicture ? sender?.profilePicture : "/no-avatar.png"}/>
                <AlertText>{notif?.text}</AlertText>
            </AlertWrapper>
            )})
            : <NoAlerts>No notifications</NoAlerts>
            }
        </AlertList>
    </NavIcon>
</NavIcons>
)}

export default Navbar