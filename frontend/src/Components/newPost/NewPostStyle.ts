import styled from "styled-components";

export const Container = styled.div`
width: 100%;
border-radius: 10px;
-webkit-box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
`
export const ErrorMessage = styled.span`
color: red;
display: flex;
justify-content: center
`

export const Wrapper = styled.div`
padding: 10px;
`
export const Top = styled.div`
display: flex;
align-items: center;
`
export const ProfileImage = styled.img`
width: 50px;
height: 50px;
border-radius: 50%;
object-fit: cover;
margin-right: 10px;
`
export const PostInput = styled.input`
border: none;
width: 80%;
outline: none
`
export const PostHr = styled.hr`
margin: 20px;
`
export const Bottom = styled.form`
display: flex;
align-items: center;
justify-content: space-between;
`
export const Options = styled.div`
display: flex;
margin-left: 20px;
`
export const Option = styled.label`
display: flex;
margin-left: 20px;
position: relative
`
export const OptionText = styled.span`
font-size: 14px;
font-weight: 500;
`
export const OptionInput = styled.input`
position: absolute;
right: 0;
left: 0;
top: 0;
bottom: 0;
opacity:0
`
export const OptionsButton = styled.button`
border: none;
padding: 7px;
border-radius: 4px;
background-color: blue;
font-weight: bold;
margin-right: 20px;
cursor: pointer;
color: white;
&:disabled {
    background-color: lightblue
}
`
export const FileContainer = styled.div`
padding: 0 20px 10px 0px;
position: relative;
height: 30vh;
width: 20vw;
`
export const UploadedImage = styled.img`
width: 100%;
height: 100%;
object-fit: contain;
`