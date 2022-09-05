import React,{useState} from 'react'
import { Modal, ModalHeader, ModalBody, Input} from 'reactstrap';
import { UserType } from '../../Redux/userSlice';
import {UserInfo, UserName, UserImage, ModalContent} from "./LeftbarStyle"
import { useParams, useNavigate } from 'react-router-dom'
import { useTypedDispatch, useTypedSelector } from "../../Redux/Hooks"


interface Props {
    showUsersModal: boolean;
    setShowUsersModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const UsersModal: React.FC<Props> = ({showUsersModal, setShowUsersModal}) => {

    const users = useTypedSelector<UserType[] | never[]>(state => state.userSlice.users)
    const user = useTypedSelector<UserType | null>(state => state.userSlice.user)
    const navigate = useNavigate()
    const notFriendUsers = users?.filter(u => !user?.friends?.some(id => u?._id === id))
    const [name, setName] = useState("")

return (
<Modal isOpen={showUsersModal} toggle={() => setShowUsersModal(!showUsersModal)}>
    <ModalHeader toggle={() => setShowUsersModal(!showUsersModal)}>Users</ModalHeader>
    <ModalBody>
    <ModalContent>
        <Input 
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Search.." 
        style={{margin: '2% 0% 5% 0%', width: "90%"}}
        />
        {notFriendUsers && notFriendUsers
        .filter(u => u?._id !== user?._id && u?.userName?.toLowerCase().trim().startsWith(name?.toLowerCase().trim()))
        .map(user => (
        <UserInfo key={user?._id} onClick={() => {
            navigate(`/profile/${user?._id}`);
            setShowUsersModal(false);
            }}>
            <UserImage
            src={user?.profilePicture ? user?.profilePicture : "/no-avatar.png"} 
            alt=""
            />
            <UserName>{user?.userName?.toUpperCase()}</UserName>
        </UserInfo>
        ))}
    </ModalContent>
    </ModalBody>
</Modal>
)}

export default UsersModal