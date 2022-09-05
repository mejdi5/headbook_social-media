import React  from 'react'
import { useTypedSelector } from "../../Redux/Hooks"
import { UserType } from '../../Redux/userSlice'
import {useParams} from 'react-router-dom'
import styled from "styled-components"


const ProfileInfoRight = styled.div`
height: 200px;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
background-color: #1877f2;
border-radius: 10px;
margin: 0px 10px
`
const ProfileInfoRightItem = styled.div`
width: 100%;
margin-top: 10px;
margin-left: 25px;
color: white
`


const UserInfo: React.FC = () => {

    const users = useTypedSelector<UserType[] | never[]>(state => state.userSlice.users)
    const userId = useParams().userId
    const profileUser = users.find(user => user?._id === userId)

return (
<ProfileInfoRight>
    <ProfileInfoRightItem>
        {profileUser?.email}
    </ProfileInfoRightItem>
    {profileUser?.relationship && 
    <ProfileInfoRightItem> 
        <strong>Relationship:</strong> {profileUser?.relationship}
    </ProfileInfoRightItem>
    }
    {profileUser?.address?.country &&
    <ProfileInfoRightItem> 
        <strong>Country:</strong> {profileUser?.address?.country} 
    </ProfileInfoRightItem>
    }
    {profileUser?.address?.city && 
    <ProfileInfoRightItem>
        <strong>City:</strong> {profileUser?.address?.city}
    </ProfileInfoRightItem>
    }
    {profileUser?.job && 
    <ProfileInfoRightItem>
        <strong>Job:</strong> {profileUser?.job}
    </ProfileInfoRightItem>
    }
</ProfileInfoRight>
)}

export default UserInfo