import styled,{css} from "styled-components"

const responsive = (props: any) => {
    return css`
    @media only screen and (max-width: 1000px) and (min-device-width: 1500px) {
    ${props}
    }
`};

export const Container = styled.div`
display: flex;
width: 100%;
`
export const Left = styled.div`
flex: 2;
`

export const Center = styled.div`
flex: 7;
margin: 20px;
`
export const Right = styled.div`
height: 900px;
flex: 2;
display: flex;
flex-direction: column;
justify-content: space-evenly;
${responsive({ display: 'none' })}
`

export const ProfileInfo = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`
export const ProfileName = styled.h4`
font-size: 24px;
margin-top: 10px
`
export const ProfileDescription = styled.h4`
font-weight: 300;
`

export const EditSuccessMessage = styled.div`
color: green;
height: 30px
`
export const EditFailiure = styled.div`
color: red;
height: 30px
`
export const ErrorMessage = styled.span`
color: red
`
export const Friends = styled.div`
height: 500px;
display: flex;
flex-direction: column;
align-items: center;
align-content: space-around
`
export const FriendsLabel = styled.h6`
display: flex;
justify-content: space-between;
font-weight: bold
`
export const FriendListLink = styled.small`
cursor: pointer;
color: blue;
font-size: 13px;
margin-right: 10px;
&:hover {
    color: cyan;
    text-decoration: underline
}
&:active {
    color: green;
}
`

export const RecentFriends = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
margin-bottom: 5px
`

export const FriendInfo = styled.div`
width: 100%;
display: flex;
align-items: center;
gap: 10px;
margin-bottom: 20px;
cursor: pointer;
&:hover {
    background-color: grey;
    border-radius: 10px
}
`
export const FriendName = styled.p`
font-weight: bold;
margin: 5px 0px;
`
export const FriendImage = styled.img`
width: 32px;
height: 32px;
border-radius: 50%;
object-fit: cover;
margin-right: 15px
`
