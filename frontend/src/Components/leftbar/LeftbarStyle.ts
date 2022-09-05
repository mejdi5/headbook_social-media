import styled from "styled-components";
import { css } from "styled-components";

const responsive = (props: any) => {
    return css`
    @media only screen and (max-width: 600px) {
    ${props}
    }
`};

export const Container = styled.div`
flex: 2;
height: calc(100vh - 50px);
position: sticky;
top: 50px;
${responsive({ width: '150px' })}

`

export const Wrapper = styled.div`
padding: 20px;
`

export const FriendList = styled.ul`
padding: 0;
margin: 0;
list-style: none;
height: 500px;
overflow-y: scroll;
::-webkit-scrollbar {
    width: 10px;
}
::-webkit-scrollbar-thumb {
    background: #888; 
};
`
export const Friend = styled.li`
display: flex;
justify-content: space-between;
align-items: center;
margin-bottom: 15px;
cursor: pointer;
padding: 10px;
margin: 10px;
&:hover{
    background-color: beige;
    border-radius: 5px
};
`
export const FriendInfo = styled.div`
display: flex;
`
export const FriendImage = styled.img`
width: 32px;
height: 32px;
border-radius: 50%;
object-fit: cover;
margin-right: 20px;
`
export const FriendName = styled.span`
display: flex;
font-weight: bold
`
export const OnlineIcon = styled.img`
width: 15px;
height: 15px;
border-radius: 50%;
margin-left: 15px;
object-fit: cover;
`

export const LeftbarFooter = styled.div`
display: flex;
justify-content: center;
align-items: center;
height: 100px;
`
export const ModalContent = styled.div`
display: flex;
flex-direction: column;
height: 500px;
overflow-y: scroll;
::-webkit-scrollbar {
    width: 10px;
}
::-webkit-scrollbar-thumb {
    background: #888; 
}
`
export const UserInfo = styled.div`
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
export const UserName = styled.p`
font-weight: bold;
margin: 5px 0px;
`
export const UserImage = styled.img`
width: 32px;
height: 32px;
border-radius: 50%;
object-fit: cover;
margin-right: 15px
`

