import React,{FormEvent, useState} from 'react'
import {AiFillLike, AiOutlineComment} from 'react-icons/ai'
import {RiShareForwardFill} from 'react-icons/ri'
import { useTypedSelector, useTypedDispatch } from '../../../Redux/Hooks'
import { UserType } from '../../../Redux/userSlice';
import { PostType } from '../../../Redux/postSlice';
import { Axios } from '../../../Axios';
import { Icon, Footer, Like, ActionLabel, Comment, Share } from './PostFooterStyle'
import ShareModal from '../postModals/ShareModal';
import { NotificationType, getAllNotifications } from '../../../Redux/notificationSlice'

interface Props {
    post: PostType;
    setLikeError: React.Dispatch<any>;
    setShareError: React.Dispatch<any>;
    setCommentInputStyle: React.Dispatch<any>;
}

const PostFooter: React.FC<Props> = ({post, setLikeError, setShareError, setCommentInputStyle}) => {
    
    const users = useTypedSelector<UserType[] | never[]>(state => state.userSlice.users)
    const user = useTypedSelector<UserType | null>(state => state.userSlice.user)
    const socket = useTypedSelector<any>(state => state.socketSlice.socket)
    const [showShareModal, setShowShareModal] = useState(false)
    const postOwner = users?.find(user => user?._id === post?.userId)
    const dispatch = useTypedDispatch()


    const handleLike = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const likers = [...post?.likers, user?._id]
            const editedPost = {likers}
            await Axios.put(`/posts/${post?._id}`, editedPost)
            if (postOwner?._id !== user?._id) {
                const newNotification = user && postOwner && {
                    postId: post?._id,
                    notificationSender: user?._id,
                    notificationReceiver: postOwner?._id,
                    text: `${user?.userName?.toUpperCase()} liked your post`
                }
            await Axios.post('/notifications', newNotification)
            socket?.emit("sendNotification", newNotification)
            }
        } catch (error) {
            console.log(error)
            setLikeError(error)
            setTimeout(() => {
                setLikeError(null)
            }, 4000)
        }
    }

    const handleDislike = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const likers = post?.likers.filter(id => id !== user?._id)
            const editedPost = {likers}
            await Axios.put(`/posts/${post?._id}`, editedPost)
        } catch (error) {
            console.log(error)
            setLikeError(error)
            setTimeout(() => {
                setLikeError(null)
            }, 4000)
        }
    }


return (
<Footer>
    <Like onClick={(e) => {
        !post?.likers.some(id => id === user?._id)
        ? handleLike(e)
        : handleDislike(e)
    }}>
        <Icon>
        {post?.likers?.some(id => id === user?._id ) 
            ? <AiFillLike color="blue"/>
            : <AiFillLike color="grey"/>
        }
        </Icon>
        <ActionLabel style={post?.likers?.some(id => id === user?._id ) ? {color: 'blue'} : {color: 'grey'}}>
            Like
        </ActionLabel>
    </Like>
    <Comment onClick={() => setCommentInputStyle("block")}>
        <Icon>
            <AiOutlineComment color="grey"/>
        </Icon>
        <ActionLabel>
            Comment
        </ActionLabel>
    </Comment>
    <Share onClick={() => setShowShareModal(true)}>
        <Icon>
            <RiShareForwardFill color="grey"/>
        </Icon>
        <ActionLabel>
            Share
        </ActionLabel>
        <ShareModal
        showShareModal={showShareModal}
        setShowShareModal={setShowShareModal}
        post={post}
        setShareError={setShareError}
        />
    </Share>
</Footer>
)}

export default PostFooter