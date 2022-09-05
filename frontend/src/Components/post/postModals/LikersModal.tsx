import React from 'react'
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { PostType } from '../../../Redux/postSlice';
import styled from "styled-components";
import { UserType } from '../../../Redux/userSlice';
import {useTypedSelector} from "../../../Redux/Hooks"
import {useNavigate} from 'react-router-dom'

interface Props {
    showLikeModal: boolean;
    setShowLikeModal: React.Dispatch<React.SetStateAction<boolean>>;
    post : PostType
}

const LikerInfo = styled.div`
display: flex;
justify-content: start;
align-items: center;
margin-bottom: 10px;
cursor: pointer;
&:hover {
    background-color: grey;
    border-radius: 10px
}
`
const LikerName = styled.p`
font-weight: bold;
margin: 5px 0px;
`
const LikerImage = styled.img`
width: 32px;
height: 32px;
border-radius: 50%;
object-fit: cover;
margin-right: 15px
`

const LikersModal: React.FC<Props> = ({showLikeModal, setShowLikeModal, post}) => {

    const users = useTypedSelector<UserType[] | never[]>(state => state.userSlice.users)
    const navigate = useNavigate()
    const Likers = users.filter((user: UserType) =>  post?.likers?.some(id => user?._id === id))


return (
<Modal isOpen={showLikeModal} toggle={() => setShowLikeModal(!showLikeModal)}>
    <ModalHeader toggle={() => setShowLikeModal(!showLikeModal)}>Persons Who Like This Post</ModalHeader>
    <ModalBody>
    {Likers?.map((liker) => {
    return (
        <LikerInfo key={liker?._id} onClick={() => {
            navigate(`/profile/${liker?._id}`);
            setShowLikeModal(false)
            }}>
            <LikerImage
            src={liker?.profilePicture ? liker?.profilePicture : "/no-avatar.png"} 
            alt=""
            />
            <LikerName>{liker?.userName?.toUpperCase()}</LikerName>
        </LikerInfo>
    )})}
    </ModalBody>
</Modal>
)}

export default LikersModal