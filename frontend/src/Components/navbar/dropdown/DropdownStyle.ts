import styled from "styled-components"

export const DropdownContent = styled.ul`
display: none;
position: absolute;
background-color: black;
border: solid 0.5px grey;
width: 200px;
padding: 12px 16px;
list-style: none;
right: -5px;
z-index: -1;
`

export const DropdownItem = styled.li`
display: flex;
justify-content: start;
align-items: center
color: white;
cursor: pointer;
font-weight: bold;
height: 30px;
&:hover {
    color: cyan;
    background-color: grey;
    border-radius: 10px
}
`
export const ProfileIcon = styled.div`
margin-right: 15px;
font-weight: bold;
font-size: 15px
`
export const ProfileLabel = styled.span`
font-weight: bold
`
export const SignOutIcon = styled.div`
margin-right: 15px;
font-weight: bold;
font-size: 15px
`
export const SignOutLabel = styled.span`
font-weight: bold
`
export const DeleteAccountIcon = styled.div`
margin-right: 15px;
font-weight: bold;
font-size: 15px
`
export const DeleteAccountLabel = styled.span`
font-weight: bold
`

export const DropdownContainer = styled.div`
position: relative;
display: inline-block;
&:hover ${DropdownContent}{
    display: block;
}
`