import React,{FormEvent, useState} from 'react'
import { PostType, getAllPosts } from '../../../Redux/postSlice';
import styled from "styled-components";
import { UserType } from '../../../Redux/userSlice';
import { Axios } from '../../../Axios';
import { Modal, ModalHeader, ModalBody, Form, Button, FormGroup} from 'reactstrap';
import { useTypedDispatch, useTypedSelector } from '../../../Redux/Hooks'
import { NotificationType, getAllNotifications } from '../../../Redux/notificationSlice'
import { useParams } from 'react-router-dom'


interface Props {
    showShareModal: boolean;
    setShowShareModal: React.Dispatch<React.SetStateAction<boolean>>;
    post : PostType,
    setShareError: React.Dispatch<any>
}

const TextArea = styled.textarea`
`
const FormFooter = styled.div`
display: flex;
flex-direction: column;
align-items: center
`
const PostImage = styled.img`
display: flex;
flex-direction: column;
align-items: center;
width: 50px;
height: 40px;
margin-bottom: 15px
`

const ShareModal: React.FC<Props> = ({showShareModal, setShowShareModal, post, setShareError}) => {

    const users = useTypedSelector<UserType[] | never[]>(state => state.userSlice.users)
    const user = useTypedSelector<UserType | null>(state => state.userSlice.user)
    const notifications = useTypedSelector<NotificationType[] | never[]>(state => state.notificationSlice.notifications)
    const socket = useTypedSelector<any>(state => state.socketSlice.socket)
    const [description, setDescription] = useState(post?.description || "")
    const param = useParams().userId
    const dispatch = useTypedDispatch()
    const postOwner = users?.find(user => user?._id === post?.userId)

    const handleSharePost = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const postToShare = { 
                userId: user?._id,
                description,
                photo: post?.photo,
                createdAt: Date.now(),
                likers: [],
                comments: []
            }
            if(postToShare?.description === "" && postToShare?.photo === null) {
                setShareError("Cannot Share an empty post");
                setTimeout(() => {
                    setShareError(null)
                }, 4000)
            } else {
                const sharedPost = await Axios.post('/posts', postToShare)
                setDescription("")
                const res = await Axios.get(param ? `/posts/user/${param}` : '/posts')
                dispatch(getAllPosts(res.data));
                if (post?.userId !== user?._id) {
                    const newNotification = user && postOwner && {
                        postId: sharedPost?.data._id,
                        notificationSender: user?._id,
                        notificationReceiver: postOwner?._id,
                        text: `${user?.userName?.toUpperCase()} shared your post`
                    }
                    newNotification && await Axios.post('/notifications', newNotification)
                    socket?.emit("sendNotification", newNotification)
                }
            }
        } catch (error) {
            console.log(error)
            setShareError(error)
            setDescription("")
            setTimeout(() => {
                setShareError(null)
            }, 4000)
        }
        setShowShareModal(false);
    }

return (
<Modal isOpen={showShareModal} toggle={() => setShowShareModal(!showShareModal)}>
    <ModalHeader toggle={() => setShowShareModal(!showShareModal)}>Share Post</ModalHeader>
    <ModalBody>
    <Form>
        <FormGroup>
            <TextArea
            className="form-control"
            value={description}
            onChange={e => setDescription(e.target.value)}
            />
        </FormGroup>
        {post?.photo && <PostImage src={post?.photo}/>}
        <FormFooter>
            <Button 
            onClick={(e) => handleSharePost(e)}
            color="primary"
            >Share</Button>
        </FormFooter>
    </Form>
    </ModalBody>
</Modal>
)}

export default ShareModal