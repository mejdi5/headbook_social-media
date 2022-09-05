import styled from "styled-components"

export const Container = styled.div`
height: 50px;
width: 100%;
background-color: #1877f2;
display: flex;
align-items: center;
position: sticky;
top: 0;
z-index: 999;
border-radius: 5px
`
export const Left = styled.div`
flex: 2
`
export const LogoImage = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;
  margin-Left: 20px;
  object-fit: cover
`
export const Logo = styled.span`
  font-size: 24px;
  margin-left: 20px;
  font-weight: bold;
  color: white;
  cursor: pointer;
`
export const Center = styled.div`
flex: 5;
display: flex;
justify-content: space-around;
align-items: center
`
export const NavLinks = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white
`
export const NavName = styled.span`
font-size: 17px;
font-weight: bold;
cursor: pointer;
`
export const NavImage = styled.img`
cursor: pointer;
margin-right: 10px;
width: 30px;
height: 30px;
border-radius: 50%;
object-fit: cover;
`

export const Right = styled.div`
  flex: 2;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  color: white;
`