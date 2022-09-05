import styled, {css} from "styled-components";

const responsive = (props: any) => {
    return css`
    @media only screen and (max-device-width: 600px) {
    ${props}
    }
`};

export const Container = styled.div`
display: flex;
width: 100%;
overflow: hidden;
`
export const LeftSide = styled.div`
flex: 2
`
export const ConversationContainer = styled.div`
flex: 9;
width: 100%;
border-radius: 5px;
height: 90%;
margin-top: 10px;
${responsive({ width: '95%' })}
`

export const ConversationWrapper = styled.div`
height: 90%;
display: flex;
justify-content: center;
align-items: center;
`

export const ConversationCard = styled.div`
transition: .5s;
border: 1px solid black;
border-radius: .55rem;
width: 97.7%;
box-shadow: 0 1px 2px 0 rgb(0 0 0 / 10%);
background-color: azure;
`
export const Chat = styled.div`
height: 90%;
width: 80vw;
${responsive({width: '100%', height: "1000px", display: 'flex', flexDirection: 'column' })}
`
export const ChatHeader = styled.div`
padding: 15px 20px;
border-bottom: 2px solid #f4f7f6;
height: 10%
`
export const ChatHeaderContent = styled.div`
`
export const ChatHeaderWrapper = styled.div`
display: flex;
align-items: center
`
export const ChatHeaderImage = styled.img`
float: left;
width: 40px;
height: 40px;
object-fit: cover;
border-radius: 50%
`
export const ChatHeaderUserName = styled.div`
float: left;
padding-left: 20px
`
export const ChatHeaderName = styled.h4`
`

export const ChatMessages = styled.div`
padding: 20px;
border-bottom: 2px solid #fff;
height: 70vh;
overflow-y: scroll;
::-webkit-scrollbar {
    width: 12px;
}
::-webkit-scrollbar-thumb {
    background: grey; 
};
`
export const MessageList = styled.ul`
padding: 0;
display: flex;
flex-direction: column
`
export const SentMessageItem = styled.li`
list-style: none;
margin-bottom: 30px
&:last-child {
    margin-bottom: 0px
}
display: flex;
justify-content: flex-start;
gap: 10px;
margin: 10px;
padding: 10px;
border-radius: 10px;
cursor: pointer
`
export const ReceivedMessageItem = styled.li`
list-style: none;
margin-bottom: 30px;
&:last-child {
    margin-bottom: 0px
};
display: flex;
justify-content: flex-end;
gap: 10px;
margin: 10px;
`

export const MessageItemWrapper = styled.div`
display: flex;
align-items: center;
gap: 20px;
border-radius: 10px;
padding: 10px;
`
export const MessageText = styled.div`
`
export const MessageDate = styled.span`
align-self: end;
font-size: 10px
`
export const SenderImage = styled.img`
width: 40px;
height: 40px;
object-fit: cover;
border-radius: 50%
`

export const ChatFooter = styled.div`
width: 100%
`
export const ChatFooterWrapper = styled.div`
border-radius: 5px;
border: 1px solid black;
border-bottom: none;
border-left: none;
height: 40px;
${responsive({height: "70px" })}
`
export const ChatFooterInput = styled.input`
border: none;
outline: none;
width: calc(100% - 45px);
`
export const SendMessage = styled.span`
width: 45px;
border-radius: 5px;
cursor: pointer
`
export const DeleteMsg = styled.span`
display: flex;
justify-content: center;
align-items: center;
color: green
`
export const DeleteError = styled.span`
display: flex;
align-items: center;
color: red
`


