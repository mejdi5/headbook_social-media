import React,{useState, FormEvent, useEffect} from 'react'
import { useTypedDispatch, useTypedSelector } from "../../Redux/Hooks"
import { getUser, UserType } from '../../Redux/userSlice'
import { getInvitation, InvitationType } from '../../Redux/invitationSlice'
import {useParams} from 'react-router-dom'
import { Button } from 'reactstrap';
import { Axios } from "../../Axios"
import InvitationAnswerModal from "./profileModals/InvitationAnswerModal"
import RemoveFromFriendsModal from './profileModals/RemoveFromFriendsModal'


interface Props {
    setInvitationError: React.Dispatch<any>
}

const ProfileInvitationButton: React.FC<Props> = ({setInvitationError}) => {

    const user = useTypedSelector<UserType | null>(state => state.userSlice.user)
    const invitations = useTypedSelector<InvitationType[] | never[]>(state => state.invitationSlice.invitations)
    const dispatch = useTypedDispatch()
    const userId = useParams().userId
    let sentInvitation = invitations.find(inv => inv.senderId === user?._id && inv.receiverId === userId)
    let receivedInvitation = invitations.find(inv => inv.senderId === userId && inv.receiverId === user?._id)
    const [isSent, setIsSent] = useState(invitations.some(inv => inv.senderId === user?._id && inv.receiverId === userId))
    const [isReceived, setIsReceived] = useState(invitations.some(inv => inv.senderId === userId && inv.receiverId === user?._id))
    const [isFriend, setIsFriend] = useState(user?.friends.some(id => userId === id) || false)
    const [showAnswerModal, setShowAnswerModal] = useState(false)
    const [showRemoveFromFriendsModal, setShowRemoveFromFriendsModal] = useState(false)
    const socket = useTypedSelector<any>(state => state.socketSlice.socket)

    const handleSendInvitation = async (e: FormEvent) => {
        e.preventDefault();
        try {
            if (!isSent && !isReceived && user?._id && userId) {
                sentInvitation = { 
                    senderId: user?._id,
                    receiverId: userId
                }
            const invitationResponse = await Axios.post('/invitations', sentInvitation)
            dispatch(getInvitation(invitationResponse.data));
            const newNotification = user && userId && {
                notificationSender: user?._id,
                notificationReceiver: userId,
                text: `${user?.userName?.toUpperCase()} sent you an invitation.`
            }
            const notificationResponse = await Axios.post('/notifications', newNotification)
            socket?.emit("sendNotification", {newNotification: notificationResponse.data})
            setIsSent(true)
            } else {
            setInvitationError("invitation already sent")
            setTimeout(() => {
                setInvitationError(null)
            }, 4000)
            }
        } catch (error) {
            console.log(error)
            setInvitationError(error)
            setTimeout(() => {
                setInvitationError(null)
            }, 4000)
        }
    }

    const handleDeleteInvitation = async (e: FormEvent) => {
        e.preventDefault();
        try {
            if (isSent) {
                await Axios.delete(`/invitations/${sentInvitation?._id}`)
                setIsSent(false)
            } else {
            setInvitationError("invitation already declined by the receiver")
            setTimeout(() => {
                setInvitationError(null)
            }, 4000)
            }
        } catch (error) {
            console.log(error)
            setInvitationError(error)
            setTimeout(() => {
                setInvitationError(null)
            }, 4000)
        }
    }

const buttonFunction = (e: FormEvent) => {
    if (isFriend) {
        setShowRemoveFromFriendsModal(true)
    } else if (!isSent && !isReceived) {
        handleSendInvitation(e)
    } else if (isReceived) {
        setShowAnswerModal(true)
    } else {
        handleDeleteInvitation(e)
    }
}



return (
<>
    <Button
    onClick={e => buttonFunction(e)}
    color={isFriend ? "light" : "primary"}
    >
    {isFriend 
    ? "Friend"
    : (!isSent && !isReceived) ? "Send Invitation"
    : isReceived ? "Answer"
    : "Sent"
    }
    </Button>

    <RemoveFromFriendsModal
    showRemoveFromFriendsModal={showRemoveFromFriendsModal}
    setShowRemoveFromFriendsModal={setShowRemoveFromFriendsModal}
    setIsFriend={setIsFriend}
    />
    
    <InvitationAnswerModal
    showAnswerModal={showAnswerModal}
    setShowAnswerModal={setShowAnswerModal}
    setInvitationError={setInvitationError}
    receivedInvitation={receivedInvitation}
    isReceived={isReceived}
    setIsReceived={setIsReceived}
    setIsFriend={setIsFriend}
    />
</>
)} 

export default ProfileInvitationButton