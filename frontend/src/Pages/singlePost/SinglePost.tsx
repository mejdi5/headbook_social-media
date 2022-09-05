import React,{useEffect, useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useTypedDispatch, useTypedSelector } from '../../Redux/Hooks'
import { PostType } from '../../Redux/postSlice'
import { UserType } from '../../Redux/userSlice'
import Navbar from '../../Components/navbar/Navbar'
import Leftbar from '../../Components/leftbar/Leftbar'
import PostTop from '../../Components/post/postTop/PostTop'
import PostBottom from '../../Components/post/postBottom/PostBottom'
import PostFooter from '../../Components/post/postFooter/PostFooter'
import CommentBoxes from '../../Components/post/commentBoxes/CommentBoxes'
import { Axios } from '../../Axios'
import { getPost } from '../../Redux/postSlice'
import { Container, LeftSide, PostContainer, PostWrapper, PostCenter, PostText, PostImage, LikeErrorMessage, CommentErrorMessage, ShareErrorMessage } from './SingePostStyle'
import { ConversationType } from '../../Redux/conversationSlice'
import Chatbots from '../../Components/chatbots/Chatbots'


const SinglePost: React.FC = () => {

    const currentPost = useTypedSelector<PostType | null>(state => state.postSlice.post)
    const postId = useParams().postId
    const [commentInputStyle, setCommentInputStyle] = useState<any>("none")
    const [likeError, setLikeError] = useState<any>(null)
    const [commentError, setCommentError] = useState<any>(null)
    const [shareError, setShareError] = useState<any>(null)
    const dispatch = useTypedDispatch()
    const chatbotConversations = useTypedSelector<ConversationType[] | never[]>(state => state.conversationSlice.chatbotConversations)


    useEffect(() => {
    const getCurrentPost = async () => {
        const res = await Axios.get(`/posts/${postId}`)
        dispatch(getPost(res.data));
        };
        getCurrentPost();
    }, [currentPost])


return (
<>
    <Navbar />
    <Container>
        <LeftSide>
            <Leftbar/>
        </LeftSide>
        <PostContainer>
        {currentPost && 
            <PostWrapper>
                <PostTop post={currentPost}/>
                <PostCenter>
                    <PostText>{currentPost?.description}</PostText>
                    {currentPost?.photo && <PostImage src={currentPost?.photo} alt="" />}
                </PostCenter>
                <PostBottom
                post={currentPost}
                setCommentInputStyle={setCommentInputStyle}
                />
                <hr></hr>
                <PostFooter
                post={currentPost}
                setLikeError={setLikeError}
                setShareError={setShareError}
                setCommentInputStyle={setCommentInputStyle}
                />
                {likeError && 
                <LikeErrorMessage>
                Cannot like This Post
                </LikeErrorMessage>
                }
                {commentError && 
                <CommentErrorMessage>
                This action is not allowed
                </CommentErrorMessage>
                }
                {shareError && 
                <ShareErrorMessage>
                Cannot share this post
                </ShareErrorMessage>
                }
                <CommentBoxes
                post={currentPost}
                setCommentError={setCommentError}
                commentInputStyle={commentInputStyle}
                />
            </PostWrapper>
        }
        </PostContainer>
        {chatbotConversations && <Chatbots/>}
    </Container>
</>
)}

export default SinglePost