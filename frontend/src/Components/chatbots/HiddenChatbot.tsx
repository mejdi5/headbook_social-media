import React from 'react'
import { useTypedDispatch, useTypedSelector } from '../../Redux/Hooks'
import { UserType } from '../../Redux/userSlice'
import { ConversationType, getHiddenChatbotConversations } from '../../Redux/conversationSlice'
import {VscChromeMaximize} from 'react-icons/vsc'
import {AiOutlineClose} from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { ChatbotIcons, ShowChatbot, CloseChatbot} from './ChatbotStyle'
import { Chatbot ,HiddenChatbotContainer, HiddenChatbotWrapper, Image, UserName, Name} from './HiddenChatbotStyle'

interface Props {
    userChattingWith: UserType | null,
    chatbotConversation: ConversationType,
    handleRemoveChatbotConversation: (chatbotConversationId: string) => void
}

const HiddenChatbot: React.FC<Props> = ({userChattingWith, chatbotConversation, handleRemoveChatbotConversation}) => {

    const dispatch = useTypedDispatch()
    const hiddenChatbotConversations = useTypedSelector<ConversationType[] | never[]>(state => state.conversationSlice.hiddenChatbotConversations)

    //maximize chatbot conversation
    const handleShowChatbotConversation = (chatbotConversation: ConversationType) => {
        dispatch(getHiddenChatbotConversations(hiddenChatbotConversations?.filter(conv => conv?._id !== chatbotConversation?._id)))
    }

return (
<Chatbot>
        <HiddenChatbotContainer>
            <HiddenChatbotWrapper className="col-lg-6">
                <Link to={`/profile/${userChattingWith?._id}`}>
                    <Image 
                    src={userChattingWith?.profilePicture || "/no-avatar.png"}
                    alt=""
                    />
                </Link>
                <Link to={`/profile/${userChattingWith?._id}`} style={{textDecoration:'none', color: 'black'}}>
                    <UserName>
                        <Name className="m-b-0">{userChattingWith?.userName?.toUpperCase()}</Name>
                    </UserName>
                </Link>
            </HiddenChatbotWrapper>
            <ChatbotIcons>
                <ShowChatbot onClick={() => handleShowChatbotConversation(chatbotConversation)}>
                    <VscChromeMaximize/>
                </ShowChatbot>
                <CloseChatbot
                onClick={() => chatbotConversation?._id && handleRemoveChatbotConversation(chatbotConversation?._id)}>
                    <AiOutlineClose
                />
                </CloseChatbot>
            </ChatbotIcons>
        </HiddenChatbotContainer>
</Chatbot>
    )}

export default HiddenChatbot