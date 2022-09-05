import React,{ useState } from 'react'
import { PostType } from '../../Redux/postSlice';
import { Container, Wrapper, Center, PostText, PostImage, LikeErrorMessage, CommentErrorMessage, ShareErrorMessage } from './PostStyle'
import CommentBoxes from './commentBoxes/CommentBoxes';
import PostFooter from './postFooter/PostFooter';
import PostBottom from './postBottom/PostBottom';
import PostTop from './postTop/PostTop';


interface Props {
    post: PostType
}

const Post: React.FC<Props> = ({post}) => {
    
    const [likeError, setLikeError] = useState<any>(null)
    const [commentError, setCommentError] = useState<any>(null)
    const [shareError, setShareError] = useState<any>(null)
    const [commentInputStyle, setCommentInputStyle] = useState<any>("none")


return (
<Container>
    <Wrapper>

        <PostTop post={post}/>
        <Center>
            <PostText>{post?.description}</PostText>
            {post?.photo && <PostImage src={post?.photo} alt="" />}
        </Center>
        <PostBottom
        post={post}
        setCommentInputStyle={setCommentInputStyle}
        />

        <hr></hr>

        <PostFooter
        post={post}
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
        post={post}
        setCommentError={setCommentError}
        commentInputStyle={commentInputStyle}
        />

    </Wrapper>
</Container>
)}

export default Post