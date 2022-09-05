import styled, {css} from "styled-components";

const responsive = (props: any) => {
    return css`
    @media only screen and (max-device-width: 600px) {
    ${props}
    }
`};

export const ChatbotCard = styled.div`
transition: .5s;
border-radius: 10px;
height: 65.5vh;
width: 300px;
background: beige;
${responsive({ height: '600px' })}

`
export const ChatHeader = styled.div`
padding: 15px 20px;
border-bottom: 2px solid #f4f7f6;
border-radius: 5px;
height: 10vh;
background-color: blue;
display: flex;
justify-content: space-between;
align-items: center;
${responsive({ height: '60px' })}
`
export const ChatbotIcons = styled.div`
display: flex;
align-items: center;
gap: 10px
`

export const HideChatbot = styled.div`
color: white;
font-weight: bold;
font-size: 20px;
cursor: pointer;
`
export const ShowChatbot = styled.div`
color: white;
font-weight: bold;
font-size: 20px;
cursor: pointer;
`

export const CloseChatbot = styled.div`
color: white;
font-weight: bold;
font-size: 20px;
cursor: pointer;
`
export const ChatHeaderWrapper = styled.div`
display: flex;
align-items: center;
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
padding-left: 20px;
color: white
`
export const ChatHeaderName = styled.h4`
`

export const ChatMessages = styled.div`
padding: 20px;
border-bottom: 2px solid #fff;
height: 50vh;
overflow-y: scroll;
::-webkit-scrollbar {
    width: 12px;
}
::-webkit-scrollbar-thumb {
    background: grey; 
};
${responsive({ height: '470px' })}
`
export const MessageList = styled.ul`
padding: 0;
display: flex;
flex-direction: column
`
export const SentMessageItem = styled.li`
list-style: none;
&:last-child {
    margin-bottom: 0px
}
display: flex;
justify-content: flex-start;
gap: 10px;
margin: 0px;
padding: 10px;
border-radius: 10px;
cursor: pointer
`
export const ReceivedMessageItem = styled.li`
list-style: none;
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
width: 100%;
height: 10vh;
`
export const ChatFooterWrapper = styled.div`
border-radius: 5px;
border: 2px solid lightblue;
height: 40px;
${responsive({ height: '70px' })}
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
