import styled from "styled-components";

export const Container = styled.div`
display: flex;
width: 100%;
`
export const LeftSide = styled.div`
flex: 2
`
export const PostContainer = styled.div`
flex: 9;
width: 100%;
height: 30%;
border-radius: 10px;
-webkit-box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
margin: 10px;
`

export const PostWrapper = styled.div`
padding: 10px;
`
export const PostCenter = styled.div`
margin: 20px 0;
`

export const PostText = styled.span`
`

export const PostImage = styled.img`
margin-top: 20px;
width: 100%;
max-height: 500px;
object-fit: contain;
`
export const LikeErrorMessage = styled.span`
display: flex;
justify-content: center;
align-items: center;
color: red
`
export const CommentErrorMessage = styled.span`
display: flex;
justify-content: center;
align-items: center;
color: red
`
export const ShareErrorMessage = styled.span`
display: flex;
justify-content: center;
align-items: center;
color: red
`