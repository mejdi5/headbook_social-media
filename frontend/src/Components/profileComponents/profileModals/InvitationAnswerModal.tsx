import React, {FormEvent} from 'react'
import { Modal, ModalHeader, ModalBody, Button} from 'reactstrap';
import { useTypedDispatch, useTypedSelector } from '../../../Redux/Hooks'
import { getUser, UserType } from '../../../Redux/userSlice';
import { Axios } from '../../../Axios';
import styled from "styled-components"
import {useParams} from 'react-router-dom'
import { getAllInvitations, InvitationType } from '../../../Redux/invitationSlice'
import { getAllNotifications, NotificationType } from '../../../Redux/notificationSlice'



interface Props {
    showAnswerModal: boolean;
    setShowAnswerModal: React.Dispatch<React.SetStateAction<boolean>>;
    setInvitationError: React.Dispatch<React.SetStateAction<string | null>>;
    receivedInvitation: InvitationType | undefined;
    isReceived: boolean;
    setIsReceived: React.Dispatch<React.SetStateAction<boolean>>;
    setIsFriend: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalBodyButtons = styled.div`
display: flex;
justify-content: space-evenly;
align-items: center;
`

const InvitationAnswerModal: React.FC<Props> = ({showAnswerModal, setShowAnswerModal, setInvitationError,  receivedInvitation, isReceived, setIsReceived, setIsFriend}) => {

    const users = useTypedSelector<UserType[] | never[]>(state => state.userSlice.users)
    const notifications = useTypedSelector<NotificationType[] | never[]>(state => state.notificationSlice.notifications)
    const user = useTypedSelector<UserType | null>(state => state.userSlice.user)
    const userId = useParams().userId
    const socket = useTypedSelector<any>(state => state.socketSlice.socket)
    const invitator = users.find(user => user?._id === userId)
    const dispatch = useTypedDispatch()
    
    const handleAcceptInvitation = async (e: FormEvent) => {
        e.preventDefault();
        try {
            if(isReceived) {
                await Axios.put(`/users/${user?._id}`, {friends: user && [...user?.friends, userId]})
                await Axios.put(`/users/${userId}`, {friends: invitator && [...invitator?.friends, user?._id]})
                await Axios.delete(`/invitations/${receivedInvitation?._id}`)
                const newNotification = user?._id && invitator?._id && {
                    notificationSender: user?._id,
                    notificationReceiver: invitator?._id,
                    text: `${user?.userName?.toUpperCase()} accepted your invitation`
                }
                newNotification && await Axios.post('/notifications', newNotification)
                newNotification && dispatch(getAllNotifications([...notifications, newNotification]))
                socket?.emit("sendNotification", newNotification)
                setIsFriend(true)
                setIsReceived(false)
            } else {
                setInvitationError("invitation has been deleted by the sender")
                setTimeout(() => {
                setInvitationError(null)
                }, 4000)
            }
        } catch (error: any) {
            console.log(error)
            setInvitationError(error?.message)
            setTimeout(() => {
                setInvitationError(null)
            }, 4000)
        }
        setShowAnswerModal(false)
    }

    const handleRefuseInvitation = async (e: FormEvent) => {
        e.preventDefault();
        try {
            if(isReceived) {
                await Axios.delete(`/invitations/${receivedInvitation?._id}`)
                const res = await Axios.get(`/invitations/${user?._id}`)
                dispatch(getAllInvitations(res.data))
                //window.location.reload();
                setIsReceived(false)
            } else {
                setInvitationError("invitation has been deleted by the sender")
                setTimeout(() => {
                setInvitationError(null)
                }, 4000)
            }
        } catch (error: any) {
            console.log(error)
            setInvitationError(error)
            setTimeout(() => {
                setInvitationError(null)
            }, 4000)
        }
        setShowAnswerModal(false)
    }


return (
<Modal isOpen={showAnswerModal} toggle={() => setShowAnswerModal(!showAnswerModal)}>
    <ModalHeader toggle={() => setShowAnswerModal(!showAnswerModal)}>Answer</ModalHeader>
    <ModalBody>
        <ModalBodyButtons>
            <Button 
            onClick={e => handleAcceptInvitation(e)}
            color="success"
            >ACCEPT</Button>
            <Button 
            onClick={e => handleRefuseInvitation(e)}
            color="danger"
            >DECLINE</Button>
        </ModalBodyButtons>
    </ModalBody>
</Modal>
)}

export default InvitationAnswerModal