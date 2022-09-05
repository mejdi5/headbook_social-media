import React, {useEffect} from 'react'
import {Container, Wrapper} from './FeedStyle'
import Post from '../post/Post'
import NewPost from '../newPost/NewPost'
import { useTypedDispatch, useTypedSelector } from '../../Redux/Hooks'
import { PostType, getAllPosts } from '../../Redux/postSlice'
import { UserType } from '../../Redux/userSlice';
import {Axios} from '../../Axios'
import { useParams } from 'react-router-dom'

const Feed: React.FC = () => {

  const users = useTypedSelector<UserType[] | never[]>(state => state.userSlice.users)
  const user = useTypedSelector<UserType | null>(state => state.userSlice.user)
  const posts = useTypedSelector<PostType[] | never[]>(state => state.postSlice.posts)
  const dispatch = useTypedDispatch()
  const userId = useParams().userId


  useEffect(() => {
    const getPosts = async () => {
      const res = await Axios.get(userId ? `/posts/user/${userId}` : '/posts')
      dispatch(getAllPosts(res.data.filter((post: PostType) => {
        const postOwner = users?.find(user => user?._id === post?.userId)
        if (postOwner?._id !== user?._id) {
          return (postOwner?.friends.some(id => id === user?._id))
        } else {
          return true
        }
      })));
    };
    getPosts();
  }, [posts])

return (
<Container>
  <Wrapper>
    <NewPost/>
    {posts.length > 0 && posts?.map((post: PostType, index: number) => (
    <Post key={index} post={post} />
    ))}
  </Wrapper>
</Container>
)}

export default Feed