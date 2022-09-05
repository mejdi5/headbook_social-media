import styled from "styled-components";

export const Top = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
`

export const TopLeft = styled.div`
display: flex;
align-items: center;
`

export const PostProfileImage = styled.img`
width: 32px;
height: 32px;
border-radius: 50%;
object-fit: cover;
cursor: pointer
`

export const PostUserName = styled.span`
font-size: 18px;
font-weight: 500;
margin: 5px 10px;
cursor: pointer;
font-weight: bold
`
export const PostDate = styled.span`
font-size: 10px;
`

export const TopRight = styled.div`
display: flex;
justify-content: flex-end;
width: 20vw
`
export const EditPost = styled.div`
cursor: pointer;
margin-left: 10px;
&:hover {
  color: green
}
`
export const RemovePost = styled.div`
cursor: pointer;
margin-left: 10px;
&:hover {
  color: red
}
`
export const EditMessage = styled.span`
color: green
`
export const ErrorMessage = styled.span`
color: red
`