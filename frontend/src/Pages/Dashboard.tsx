import React, {useEffect} from 'react'
import Navbar from '../Components/navbar/Navbar'
import styled from "styled-components"
import Leftbar from '../Components/leftbar/Leftbar'
import Feed from '../Components/feed/Feed'
import {Axios} from '../Axios'
import { useTypedDispatch, useTypedSelector } from "../Redux/Hooks"
import { getAllUsers, UserType } from '../Redux/userSlice'
import { load } from '../Redux/userSlice'
import Chatbots from '../Components/chatbots/Chatbots'
import { ConversationType } from '../Redux/conversationSlice'


const Container = styled.div`
display: flex;
width: 100%;
`

const Dashboard: React.FC = () => {

  const users = useTypedSelector<UserType[] | never[]>(state => state.userSlice.users)
  const dispatch = useTypedDispatch()
  const chatbotConversations = useTypedSelector<ConversationType[] | never[]>(state => state.conversationSlice.chatbotConversations)

  useEffect(() => {
    const getUsers = async () => {
      dispatch(load(true))
      try {
        const res = await Axios.get('/users')
        dispatch(load(false))
        dispatch(getAllUsers(res.data));
      } catch (error) {
        dispatch(load(false))
        console.log(error)
      }
    };
    getUsers();
  }, [users])


  return (
    <div>
      <Navbar/>
      <Container>
        <Leftbar/>
        <Feed/>
        {chatbotConversations && <Chatbots/>}
      </Container>
    </div>
  )
}

export default Dashboard