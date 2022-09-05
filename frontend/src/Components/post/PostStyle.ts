import styled from "styled-components";

export const Container = styled.div`
width: 100%;
border-radius: 10px;
-webkit-box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
margin: 30px 0;
`

export const Wrapper = styled.div`
padding: 10px;
`

export const Center = styled.div`
margin: 20px 0;
`

export const PostText = styled.span`
`

export const PostImage = styled.img`
margin-bottom: 20px;
width: 100%;
max-height: 300px;
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