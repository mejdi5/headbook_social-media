import React,{FormEvent, useState} from 'react'
import { format } from "timeago.js";
import {AiOutlineClose} from 'react-icons/ai'
import { useTypedSelector, useTypedDispatch } from '../../../Redux/Hooks'
import { UserType } from '../../../Redux/userSlice';
import { PostType, CommentType } from '../../../Redux/postSlice';
import { Axios } from '../../../Axios';
import { Link } from 'react-router-dom'
import { NotificationType, getAllNotifications } from '../../../Redux/notificationSlice'
import {CommentContainer, CommentWrapper, SingleComment, AddCommentForm, CommentatorImage, CommentInfo, CommentLabel, CommentRight, CommentDate, DeleteCommentIcon, CommentatorName, CommentText, AddCommentInput, AddCommentButton} from './CommentBoxesStyle'



interface Props {
    post: PostType;
    setCommentError: React.Dispatch<any>;
    commentInputStyle: any
}

const CommentBoxes: React.FC<Props> = ({post, setCommentError, commentInputStyle}) => {
    
    const users = useTypedSelector<UserType[] | never[]>(state => state.userSlice.users)
    const user = useTypedSelector<UserType | null>(state => state.userSlice.user)
    const [commentText, setCommentText] = useState<any>("")
    const socket = useTypedSelector<any>(state => state.socketSlice.socket)
    const dispatch = useTypedDispatch()
    const postOwner = users?.find(user => user?._id === post?.userId)

    const handleAddComment = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const newComment = {
                _id: Date.now().toString(),
                commentatorId: user?._id,
                text: commentText,
                date: Date.now()
            }
            const comments = [...post.comments, newComment]
            const editedPost = {comments}
            await Axios.put(`/posts/${post?._id}`, editedPost)
            setCommentText("")
            if (postOwner?._id !== user?._id) {
                const newNotification = user && postOwner && {
                    postId: post?._id,
                    notificationSender: user?._id,
                    notificationReceiver: postOwner?._id,
                    text: `${user?.userName?.toUpperCase()} commented your post`
                }
                newNotification && await Axios.post('/notifications', newNotification)
                socket?.emit("sendNotification", newNotification)
            }
        } catch (error) {
            console.log(error)
            setCommentError(error)
            setCommentText("")
            setTimeout(() => {
                setCommentError(null)
            }, 4000)
        }
    }

    const handleDeleteComment = async (e: FormEvent, commentId: string) => {
        e.preventDefault();
        try {
            const comments = post.comments.filter(comment => comment?._id !== commentId)
            const editedPost = {comments}
            await Axios.put(`/posts/${post?._id}`, editedPost)
        } catch (error) {
            console.log(error)
            setCommentError(error)
            setTimeout(() => {
                setCommentError(null)
            }, 4000)
        }
    }


return (
<CommentContainer style={{display: commentInputStyle}}>
    <CommentWrapper>
    {post?.comments?.map((comment: CommentType, index: number) => {
        const commentator = users.find(user => user?._id === comment?.commentatorId)
        return (
        <SingleComment key={index}>
            <CommentInfo>
                <Link to={`/profile/${comment?.commentatorId}`}>
                    <CommentatorImage
                    src={commentator?.profilePicture 
                        ? commentator?.profilePicture 
                        : "/no-avatar.png"} 
                        alt=""
                    />
                </Link>
                <CommentLabel>
                    <Link to={`/profile/${comment?.commentatorId}`} style={{textDecoration: 'none'}}>
                        <CommentatorName>
                            {commentator?.userName?.toUpperCase()}
                        </CommentatorName>
                    </Link>
                    <CommentText>
                        {comment?.text}
                    </CommentText>
                </CommentLabel>
            </CommentInfo>
            <CommentRight>
            {comment?.commentatorId === user?._id &&
                <DeleteCommentIcon  onClick={e => handleDeleteComment(e, comment?._id)}>
                    <AiOutlineClose/>
                </DeleteCommentIcon>
                    }
                <CommentDate>
                    {format(comment?.date)}
                </CommentDate>
            </CommentRight>
        </SingleComment>
        )})}
        <AddCommentForm>
            <AddCommentInput 
            type="text" 
            placeholder="Write a comment.."
            value={commentText}
            onChange={e => setCommentText(e.target.value)}
            />
            <AddCommentButton onClick={e => handleAddComment(e)}>
                Add
            </AddCommentButton>
        </AddCommentForm>
    </CommentWrapper>
</CommentContainer>
)}

export default CommentBoxes