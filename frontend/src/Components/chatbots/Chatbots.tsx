import React,{useEffect} from 'react'
import { useTypedDispatch, useTypedSelector } from '../../Redux/Hooks'
import { getChatbotConversations, ConversationType } from '../../Redux/conversationSlice'
import { getAllChatbotConversationMessages, MessageType } from '../../Redux/messageSlice'
import { UserType } from '../../Redux/userSlice'
import styled from "styled-components";
import SingleChatbot from './SingleChatbot'
import HiddenChatbot from './HiddenChatbot'


export const ChatbotContainer = styled.div`
display: flex;
justify-content: center;
gap: 5px;
border-radius: 5px;
position: fixed;
bottom: 0vh;
margin-left: 300px;
`

const Chatbots: React.FC = () => {

    const users = useTypedSelector<UserType[] | never[]>(state => state.userSlice.users)
    const user = useTypedSelector<UserType | null>(state => state.userSlice.user)
    const chatbotConversations = useTypedSelector<ConversationType[] | never[]>(state => state.conversationSlice.chatbotConversations)
    const chatbotConversationMessages = useTypedSelector<MessageType[] | never[]>(state => state.messageSlice.chatbotConversationMessages)
    const hiddenChatbotConversations = useTypedSelector<ConversationType[] | never[]>(state => state.conversationSlice.hiddenChatbotConversations)
    const dispatch = useTypedDispatch()

    //remove chatbot conversation
    const handleRemoveChatbotConversation = (chatbotConversationId: string) => {
        dispatch(getAllChatbotConversationMessages(chatbotConversationMessages.filter(message => message?.conversationId !== chatbotConversationId)))
        dispatch(getChatbotConversations(chatbotConversations.filter(conv => conv?._id !== chatbotConversationId)))
    }

    return (
        <ChatbotContainer 
        style={chatbotConversations.length > 0 
            ? {width: `${chatbotConversations.length*300} px`} 
            : {display: 'none'}
        }>
            {chatbotConversations && chatbotConversations.length > 0 &&
            chatbotConversations?.map((chatbotConversation: ConversationType) => {
                const userChattingWith = users
                    .filter(u => u?._id !== user?._id)
                    .find(u => u._id === chatbotConversation?.senderId || u?._id === chatbotConversation?.receiverId) || user
                if (!hiddenChatbotConversations.some(conv => conv?._id === chatbotConversation?._id)) {
                return (
                    <SingleChatbot
                    key={chatbotConversation?._id}
                    userChattingWith={userChattingWith}
                    chatbotConversation={chatbotConversation} 
                    handleRemoveChatbotConversation={handleRemoveChatbotConversation}
                    />
                )} else {
                    return (
                        <HiddenChatbot
                        key={chatbotConversation?._id}
                        userChattingWith={userChattingWith}
                        chatbotConversation={chatbotConversation} 
                        handleRemoveChatbotConversation={handleRemoveChatbotConversation}
                        />
                    )
                }
            }
            )}
        </ChatbotContainer>
    )
}

export default Chatbots