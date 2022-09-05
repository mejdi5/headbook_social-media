import styled from "styled-components";

export const Chatbot = styled.div`
transition: .5s;
height: auto;
width: 300px;
align-self: end;
`

export const HiddenChatbotContainer = styled.div`
padding: 15px 20px;
height: 6.5vh;
width: 100%;
background-color: blue;
display: flex;
justify-content: space-between;
align-items: center; 
`

export const HiddenChatbotWrapper = styled.div`
display: flex;
align-items: center;
`
export const Image = styled.img`
float: left;
width: 40px;
height: 40px;
object-fit: cover;
border-radius: 50%
`
export const UserName = styled.div`
float: left;
padding-left: 20px;
color: white
`
export const Name = styled.h4`
`