import styled from "styled-components"


export const UserImagesWrapper = styled.div`
height: 320px;
position: relative;
`

export const CoverImage = styled.img`
width: 100%;
height: 250px;
object-fit: cover;
`
export const UploadCoverImageInput = styled.input`
cursor: pointer;
position: absolute;
right: 0;
left: 0;
top: 0;
bottom: 0;
opacity: 0;
`
export const UploadCoverImageButton = styled.button`
cursor: pointer;
position: absolute;
height: 250px;
right: 0;
left: 0;
top: 0;
bottom: 0;
opacity: 0.5;
border: none;
display: flex;
align-items: start;
justify-content: center;
background-color: yellow
`

export const ProfileImage = styled.img`
width: 250px;
height: 250px;
border-radius: 50%;
object-fit: cover;
position: absolute;
left: 0;
right: 0;
margin: auto;
top: 80px;
border: 3px solid white;
`
export const UploadProfileImageInput = styled.input`
cursor: pointer;
position: absolute;
right: 0;
left: 0;
width: 250px;
height: 250px;
border-radius: 50%;
margin: auto;
top: 80px;
opacity: 0
`
export const UploadProfileImageButton = styled.button`
cursor: pointer;
position: absolute;
right: 0;
left: 0;
width: 250px;
height: 250px;
border-radius: 50%;
margin: auto;
top: 80px;
opacity: 0.5;
border: none;
`

