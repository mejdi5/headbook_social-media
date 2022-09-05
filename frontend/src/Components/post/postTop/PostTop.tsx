import React,{FormEvent, useState} from 'react'
import { format } from "timeago.js";
import {AiOutlineClose, AiFillEdit} from 'react-icons/ai'
import { useTypedDispatch, useTypedSelector } from '../../../Redux/Hooks'
import { UserType } from '../../../Redux/userSlice';
import { getAllPosts, PostType } from '../../../Redux/postSlice';
import { Axios } from '../../../Axios';
import EditPostModal from '../postModals/EditPostModal';
import { useParams, Link } from 'react-router-dom'
import { Top, TopLeft, TopRight, PostProfileImage, PostUserName, PostDate, EditPost,RemovePost,EditMessage, ErrorMessage } from './PostTopStyle'



interface Props {
    post: PostType
}

const PostTop: React.FC<Props> = ({post}) => {
    
    const users = useTypedSelector<UserType[] | never[]>(state => state.userSlice.users)
    const user = useTypedSelector<UserType | null>(state => state.userSlice.user)
    const dispatch = useTypedDispatch()
    const [showPostModal, setShowPostModal] = useState(false)
    const [msg, setMsg] = useState<string | null>(null)
    const [deleteError, setDeleteError] = useState<any>(null)
    const [editError, setEditError] = useState<any>(null)
    const userId = useParams().userId
    const postId = useParams().postId

    const postOwner = users?.find(user => user?._id === post.userId)

    const handleDeletePost = async (e: FormEvent, id: string) => {
        e.preventDefault();
        try {
            await Axios.delete(`/posts/${id}`)
                const res = await Axios.get(userId ? `/posts/user/${userId}` : '/posts')
                dispatch(getAllPosts(res.data));
        } catch (error) {
            setDeleteError(error)
            setTimeout(() => {
                setDeleteError(null)
            }, 4000)
        }
    }

return (
<Top>
    <TopLeft>
        <Link to={`/profile/${postOwner?._id}`}>
            <PostProfileImage
            src={postOwner?.profilePicture ? postOwner?.profilePicture : "/no-avatar.png"}
            alt=""
            />
        </Link>
        <Link to={`/profile/${postOwner?._id}`} style={{textDecoration: 'none'}}>
            <PostUserName>
                {postOwner?.userName?.toUpperCase() || "Deleted User"}
            </PostUserName>
        </Link>
        <Link to={`/post/${post?._id}`} style={{textDecoration: 'none'}}>
            <PostDate>
                {format(post?.createdAt)}
            </PostDate>
        </Link>
    </TopLeft>
    <TopRight>
        {deleteError && <ErrorMessage>Cannot Delete This Post</ErrorMessage>}
        {editError && <ErrorMessage>Cannot Edit This Post</ErrorMessage>}
        {msg && <EditMessage>{msg}</EditMessage>}
        {post?.userId === user?._id && 
        <EditPost>
            <AiFillEdit onClick={() => setShowPostModal(true)}/>
            <EditPostModal
            showPostModal={showPostModal}
            setShowPostModal={setShowPostModal}
            setMsg={setMsg}
            setEditError={setEditError}
            post={post}
            />
        </EditPost>
        }
        {post?.userId === user?._id && !postId &&
        <RemovePost onClick={(e) => post?._id && handleDeletePost(e, post?._id)}>
            <AiOutlineClose/>
        </RemovePost>
        }
    </TopRight>
</Top>
)}

export default PostTop