import React, {useState, FormEvent} from 'react'
import { Modal, ModalHeader, ModalBody, Button} from 'reactstrap';
import { useTypedDispatch, useTypedSelector } from '../../../Redux/Hooks'
import { getUser, UserType } from '../../../Redux/userSlice';
import { Axios } from '../../../Axios';
import styled from "styled-components"
import {useParams} from 'react-router-dom'


interface Props {
    showRemoveFromFriendsModal: boolean;
    setShowRemoveFromFriendsModal: React.Dispatch<React.SetStateAction<boolean>>
    setIsFriend: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalBodyButton = styled.div`
display: flex;
justify-content: center;
align-items: center;
`

const RemoveFromFriendsModal: React.FC<Props> = ({showRemoveFromFriendsModal, setShowRemoveFromFriendsModal, setIsFriend}) => {

    const user = useTypedSelector<UserType | null>(state => state.userSlice.user)
    const users = useTypedSelector<UserType[] | never[]>(state => state.userSlice.users)
    const userId = useParams().userId
    const friendToDelete = users.find(u => u?._id === userId)
    const [error, setError] = useState(null)

    const handleRemoveFriend = async (e: FormEvent) => {
        e.preventDefault();
        try {
            await Axios.put(`/users/${user?._id}`, { friends: user?.friends?.filter(id => id !== userId) })
            await Axios.put(`/users/${userId}`, {friends: friendToDelete?.friends?.filter(id => id !== user?._id)})
            setIsFriend(false)
        } catch (error: any) {
            console.log(error)
            setError(error?.message)
            setTimeout(() => {
                setError(null)
            }, 4000)
        }
        setShowRemoveFromFriendsModal(false)
    }


return (
<Modal isOpen={showRemoveFromFriendsModal} toggle={() => setShowRemoveFromFriendsModal(!showRemoveFromFriendsModal)}>
    <ModalHeader toggle={() => setShowRemoveFromFriendsModal(!showRemoveFromFriendsModal)}>
        Remove {friendToDelete?.userName} From Friend List ?
    </ModalHeader>
    <ModalBody>
        <ModalBodyButton>
            {error && <p>Cannot remove from friend list</p>}
            <Button 
            onClick={e => handleRemoveFriend(e)}
            color="success"
            >Delete</Button>
        </ModalBodyButton>
    </ModalBody>
</Modal>
)}

export default RemoveFromFriendsModal