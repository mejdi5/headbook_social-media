import styled from "styled-components";

export const CommentContainer = styled.div`
border-radius: 10px;
display: flex;
justify-content: center;
align-items: center;
`

export const CommentWrapper = styled.div`
margin: 10px 50px;
display: flex;
flex-direction: column;
`
export const SingleComment = styled.div`
display: flex;
border: 1px solid black;
border-radius: 10px;
justify-content: space-between; 
align-items: center;
padding: 10px;
margin-bottom: 5px;
background-color: rgb(244, 237, 237);
height: 60px
`
export const DeleteCommentIcon = styled.div`
height: 50px;
width: 50px;
display: flex;
justify-content: center;
align-items: center;
font-size: 20px;
opacity: 0;
&:hover {
  opacity: 1;
  cursor: pointer;
  color: red
}
`

export const CommentatorImage = styled.img`
cursor: pointer;
margin-right: 20px;
width: 50px;
height: 50px;
border-radius: 50%;
object-fit: contain;
`
export const CommentInfo = styled.div`
display: flex;
align-items: center
`
export const CommentLabel = styled.div`
display: flex;
flex-direction: column;
height: 60px
`

export const CommentatorName = styled.h5`
margin: 2px 0px;
cursor: pointer;
color: black;
font-size: 17px
`
export const CommentRight = styled.small`
display: flex;
align-items: center
`
export const CommentDate = styled.small`

`
export const CommentText = styled.p`
`
export const AddCommentForm = styled.div`
border: 1px solid black;
display: flex;
justify-content: space-between;
height: 60px
`
export const AddCommentInput = styled.input`
border: none;
outline: none;
width: 60vw;
`
export const AddCommentButton = styled.button`
border: none;
width: 10%;
border-radius: 10px
`