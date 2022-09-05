import React,{useState, useEffect} from 'react'
import { Container, Wrapper, FriendList, Friend, FriendInfo, FriendImage, FriendName, OnlineIcon, LeftbarFooter } from './LeftbarStyle'
import { useTypedSelector, useTypedDispatch } from "../../Redux/Hooks"
import { UserType } from '../../Redux/userSlice'
import { Button } from 'reactstrap'
import UsersModal from './UsersModal'
import { ConversationType, getChatbotConversations, getHiddenChatbotConversations } from '../../Redux/conversationSlice'
import { getAllChatbotConversationMessages, MessageType } from '../../Redux/messageSlice'
import { Axios } from '../../Axios'


const Leftbar: React.FC = () => {

  const dispatch = useTypedDispatch()
  const user = useTypedSelector<UserType | null>(state => state.userSlice.user)
  const users = useTypedSelector<UserType[] | never[]>(state => state.userSlice.users)
  const userFriends = user?.friends?.map(id => users.find(u => u?._id === id))
  const onlyOne = (value: any, index: number, self: any) => self.indexOf(value) === index //remove duplicates in array
  const onlineUsers = useTypedSelector<UserType[] | never[]>(state => state.userSlice.onlineUsers)
  const onlineFriends = onlineUsers?.filter(u => user?.friends?.some(id => id === u?._id) && u?._id !== user?._id)?.filter(onlyOne)
  const offlineFriends = userFriends?.filter(friend => !onlineUsers.some(onlineUser => onlineUser?._id === friend?._id)).filter(onlyOne)
  const [showUsersModal, setShowUsersModal] = useState(false)
  const conversations = useTypedSelector<ConversationType[] | never[]>(state => state.conversationSlice.conversations)
  const chatbotConversations = useTypedSelector<ConversationType[] | never[]>(state => state.conversationSlice.chatbotConversations)
  const hiddenChatbotConversations = useTypedSelector<ConversationType[] | never[]>(state => state.conversationSlice.hiddenChatbotConversations)
  const chatbotConversationMessages = useTypedSelector<MessageType[] | never[]>(state => state.messageSlice.chatbotConversationMessages)
  
  const handleAddChatbotConversation = async (newChatbotConversation: ConversationType) => {
    chatbotConversations.length < 4 && !chatbotConversations.some(conv => conv?._id === newChatbotConversation?._id) &&
    dispatch(getChatbotConversations([...chatbotConversations, newChatbotConversation]))
    const res = await Axios.get(`/messages/${newChatbotConversation?._id}`)
            dispatch(getAllChatbotConversationMessages([
                ...chatbotConversationMessages, 
                ...res.data.filter((message: MessageType) => !chatbotConversationMessages.some(m => m?._id === message?._id ))
            ]));
    dispatch(getHiddenChatbotConversations(hiddenChatbotConversations?.filter(conv => conv?._id !== newChatbotConversation?._id)))
  }
  
return (
  <Container>
    <Wrapper>
      <FriendList>
      {onlineFriends && onlineFriends.map((onlineFriend: any, index: number) => {
        const newConversation = conversations.find(conv => conv?.senderId === onlineFriend?._id || conv?.receiverId === onlineFriend?._id)
      return(
          <Friend 
          key={index} 
          onClick={() => newConversation && handleAddChatbotConversation(newConversation)}
          >
            <FriendInfo>
              <FriendImage src={onlineFriend?.profilePicture ? onlineFriend?.profilePicture : "/no-avatar.png"} alt="" />
              <FriendName>{onlineFriend?.userName?.toUpperCase()}</FriendName>
            </FriendInfo>
            <OnlineIcon src="/online.png" alt=""/>
          </Friend>
      )})}
      {offlineFriends && offlineFriends?.length > 0 && offlineFriends.map((offlineFriend: any, index: number) => {
        const newConversation = conversations.find(conv => conv?.senderId === offlineFriend?._id || conv?.receiverId === offlineFriend?._id)
        return(
          <Friend 
          key={index}
          onClick={() => newConversation && handleAddChatbotConversation(newConversation)}
          >
            <FriendInfo>
              <FriendImage src={offlineFriend?.profilePicture ? offlineFriend.profilePicture : "/no-avatar.png"} alt="" />
              <FriendName>{offlineFriend?.userName?.toUpperCase()}</FriendName>
            </FriendInfo>
          </Friend>
      )})}
      </FriendList>
      <hr></hr>
      <LeftbarFooter>
        <Button color="success" onClick={() => setShowUsersModal(true)}>
          Search
        </Button>
        <UsersModal
        showUsersModal={showUsersModal}
        setShowUsersModal={setShowUsersModal}
        />
      </LeftbarFooter>
    </Wrapper>
  </Container>
)}

export default Leftbar