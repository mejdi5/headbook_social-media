import React from 'react'
import { Modal, ModalHeader, ModalBody} from 'reactstrap';
import { UserType } from '../../../Redux/userSlice';
import {FriendInfo, FriendName, FriendImage} from "../../../Pages/profile/ProfileStyle"
import { useParams, useNavigate } from 'react-router-dom'
import { useTypedDispatch, useTypedSelector } from '../../../Redux/Hooks'


interface Props {
    showFriendsModal: boolean;
    setShowFriendsModal: React.Dispatch<React.SetStateAction<boolean>>;
    profileUserFriends: UserType[]
}

const FriendListModal: React.FC<Props> = ({showFriendsModal, setShowFriendsModal, profileUserFriends}) => {

    const navigate = useNavigate()
    const user = useTypedSelector<UserType | null>(state => state.userSlice.user)


return (
<Modal isOpen={showFriendsModal} toggle={() => setShowFriendsModal(!showFriendsModal)}>
    <ModalHeader toggle={() => setShowFriendsModal(!showFriendsModal)}>All Friends</ModalHeader>
    <ModalBody>
    {profileUserFriends.map(friend => (
        <FriendInfo key={friend?._id} onClick={() => {
            navigate(`/profile/${friend?._id}`);
            setShowFriendsModal(false);
            }}>
            <FriendImage
            src={friend?.profilePicture ? friend?.profilePicture : "/no-avatar.png"} 
            alt=""
            />
            <FriendName>{friend?.userName?.toUpperCase()}</FriendName>
        </FriendInfo>
    ))}
    </ModalBody>
</Modal>
)}

export default FriendListModal