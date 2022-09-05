import React,{useState} from 'react'
import Leftbar from '../../Components/leftbar/Leftbar'
import Navbar from '../../Components/navbar/Navbar'
import Feed from '../../Components/feed/Feed'
import UserImages from '../../Components/profileComponents/userImages/UserImages'
import { useTypedSelector } from "../../Redux/Hooks"
import { UserType } from '../../Redux/userSlice'
import { useParams, useNavigate } from 'react-router-dom'
import EditProfile from '../../Components/profileComponents/profileModals/EditProfile'
import UserInfo from '../../Components/profileComponents/UserInfo'
import ProfileInvitationButton from '../../Components/profileComponents/ProfileInvitationButton'
import FriendListModal from '../../Components/profileComponents/profileModals/FriendListModal'
import { ConversationType } from '../../Redux/conversationSlice'
import Chatbots from '../../Components/chatbots/Chatbots'
import { Button } from 'reactstrap'
import { 
    Container, 
    Left, 
    Center, 
    Right, 
    Friends,
    ProfileInfo, 
    ProfileName, 
    ProfileDescription, 
    EditSuccessMessage, 
    EditFailiure, 
    ErrorMessage,
    RecentFriends,
    FriendsLabel,
    FriendListLink,
    FriendInfo,
    FriendName,
    FriendImage
} from './ProfileStyle'


const Profile: React.FC = () => {

    const users = useTypedSelector<UserType[] | never[]>(state => state.userSlice.users)
    const user = useTypedSelector<UserType | null>(state => state.userSlice.user) 
    const [showUserModal, setShowUserModal] = useState(false)
    const [showFriendsModal, setShowFriendsModal] = useState(false)
    const [msg, setMsg] = useState<string | null>(null)
    const [error, setError] = useState<any>(null)
    const userId = useParams().userId
    const navigate = useNavigate()
    const profileUser = users.find(user => user?._id === userId)
    const profileUserFriends = users.filter((user: UserType) =>  profileUser?.friends.find(id => id === user?._id))
    const [invitationError, setInvitationError] = useState<any>(null)
    const conversations = useTypedSelector<ConversationType[] | never[]>(state => state.conversationSlice.conversations)
    const conversation = conversations.find(conv => 
        (conv.senderId === user?._id && conv.receiverId === userId) ||
        (conv.senderId === userId && conv.receiverId === user?._id) 
    )
    const chatbotConversations = useTypedSelector<ConversationType[] | never[]>(state => state.conversationSlice.chatbotConversations)


return (
<>
    <Navbar />
    <Container>
        {userId === user?._id && 
        <Left>
            <Leftbar/>
        </Left>
        }
        <Center>
            <UserImages
            setMsg={setMsg}
            setError={setError}
            />
            <ProfileInfo>
                <ProfileName>{profileUser?.userName?.toUpperCase()}</ProfileName>
                <ProfileDescription>{profileUser?.description?.toLowerCase()}</ProfileDescription>
                {user?._id !== userId &&
                <div style={{display:'flex', gap: '10px'}}>
                <ProfileInvitationButton
                setInvitationError={setInvitationError}
                />
                <Button onClick={() => conversation?._id && navigate(`/conversation/${conversation?._id}`)}>
                    Send Message
                </Button>
                </div>
                }
                {user?._id !== userId && invitationError && 
                <ErrorMessage>
                    Action not allowed
                </ErrorMessage>
                }
            </ProfileInfo>
            <Feed/>
        </Center>

        <Right>
            {msg && <EditSuccessMessage>{msg}</EditSuccessMessage>}
            {error && <EditFailiure>Cannot edit profile</EditFailiure>}
            <UserInfo/>
            {user?._id === userId && 
            <EditProfile
            showUserModal={showUserModal}
            setShowUserModal={setShowUserModal}
            setMsg={setMsg}
            setError={setError}
            />
            }
            <div>
            <hr></hr>
            <FriendsLabel>
                <strong>Friends</strong>
                <FriendListLink onClick={() => setShowFriendsModal(true)}>All friends</FriendListLink>
            </FriendsLabel>
            </div>
            <Friends>
                <RecentFriends>
                    {profileUserFriends.slice(0, 5).map(friend => (
                    <FriendInfo key={friend?._id} onClick={() => navigate(`/profile/${friend?._id}`)}>
                        <FriendImage
                        src={friend?.profilePicture ? friend?.profilePicture : "/no-avatar.png"} 
                        alt=""
                        />
                        <FriendName>{friend?.userName?.toUpperCase()}</FriendName>
                    </FriendInfo>
                    ))}
                </RecentFriends>
                <FriendListModal
                showFriendsModal={showFriendsModal}
                setShowFriendsModal={setShowFriendsModal}
                profileUserFriends={profileUserFriends}
                />
            </Friends>
        </Right>
        {chatbotConversations && <Chatbots/>}
    </Container>
</>
)}

export default Profile