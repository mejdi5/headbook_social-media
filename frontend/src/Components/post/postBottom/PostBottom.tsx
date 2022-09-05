import React,{ useState } from 'react'
import {AiFillLike} from 'react-icons/ai'
import { PostType } from '../../../Redux/postSlice';
import { Bottom, BottomLeft, BottomRight, LikeCounter, CommentCounter, Icon } from './PostBottomStyle'
import LikersModal from '../postModals/LikersModal';



interface Props {
    post: PostType;
    setCommentInputStyle: React.Dispatch<any>
}

const PostBottom: React.FC<Props> = ({post, setCommentInputStyle}) => {

    const [showLikeModal, setShowLikeModal] = useState(false)

return (
<Bottom>
    <BottomLeft onClick={() => setShowLikeModal(true)}>
        {post?.likers?.length > 0 && 
        <Icon>
            <AiFillLike color="blue"/>
        </Icon>
        }
        <LikeCounter>
            {post?.likers?.length > 1 
                ? `${post?.likers?.length} likes`
                : post?.likers?.length === 1 ? " 1 like"
                : null 
            }
        </LikeCounter>
        <LikersModal
        showLikeModal={showLikeModal}
        setShowLikeModal={setShowLikeModal}
        post={post}
        />
    </BottomLeft>
    <BottomRight>
        <CommentCounter onClick={() => setCommentInputStyle("block")}>
            {post?.comments?.length > 1 
                ? `${post?.comments?.length} comments`
                : post?.comments?.length === 1 ? " 1 comment"
                : null 
            }
        </CommentCounter>
    </BottomRight>
</Bottom>
)}

export default PostBottom