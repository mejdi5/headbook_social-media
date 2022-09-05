import styled, {css} from "styled-components"

const responsive = (props: any) => {
  return css`
  @media only screen and (max-device-width: 600px) {
  ${props}
  }
`};

export const NavIcons = styled.div`
display: flex;
position: relative
`
export const AlertList = styled.div`
position: absolute;
top: 40px;
right:0;
background-color: #72a4e4;
color: white;
font-weight: 300;
display: flex;
flex-direction: column;
padding: 10px;
width: 17vw;
max-height: 50vh;
overflow-y: scroll;
::-webkit-scrollbar {
  width: 5px;
};
::-webkit-scrollbar-thumb {
  background: #888; 
};
`
export const AlertWrapper = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
gap: 10px;
background-color: beige;
margin-bottom: 10px;
border-radius: 5px;
padding: 0px 5px;
min-height: 4vh;
&:hover {
  background-color: cyan
}
`

export const ConversationList = styled.div`
position: absolute;
top: 40px;
right:0;
background-color: #72a4e4;
color: white;
font-weight: 300;
display: flex;
flex-direction: column;
padding: 10px;
width: 30vw;
max-height: 50vh;
overflow-x: hidden;
overflow-y: scroll;
::-webkit-scrollbar {
  width: 10px;
};
::-webkit-scrollbar-thumb {
  background: #888; 
};
`
export const ConversationWrapper = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
gap: 10px;
background-color: beige;
margin-bottom: 10px;
border-radius: 5px;
padding: 0px 5px;
height: 7vh;
&:hover {
  background-color: cyan
}
`

export const AlertText = styled.div`
display:flex;
justify-content: start;
font-size: 13px;
width: 11vw;
color: black
`
export const AlertImage = styled.img`
width: 20px;
height: 20px;
border-radius: 50%;
`

export const ChatWith = styled.div`
display: flex;
align-items: center;
gap: 10px
`
export const ChatWithText = styled.div`
display:flex;
justify-content: start;
font-size: 13px;
font-weight: bold;
width: 11vw;
color: black;
${responsive({fontSize: '20px' })}
`
export const ChatWithImage = styled.img`
width: 20px;
height: 20px;
border-radius: 50%;
${responsive({width: '40px', height: '40px' })}

`

export const LastMessage = styled.div`
color: grey;
${responsive({fontSize: '20px' })}
`

export const NoAlerts = styled.div`
display: flex;
justify-content: center;
`

export const NavIcon = styled.div`
  margin-right: 20px;
  cursor: pointer;
  position: relative;
  border-radius: 40%;
  padding: 5px;
`

export const Badge = styled.span`
width: 16px;
height: 16px;
background-color: red;
border-radius: 50%;
color: white;
position: absolute;
top: -2px;
right: -2px;
display: flex;
align-items: center;
justify-content: center;
font-size: 12px;
`