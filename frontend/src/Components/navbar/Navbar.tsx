import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useTypedSelector } from '../../Redux/Hooks'
import { UserType } from '../../Redux/userSlice'
import { Container, Left, Center, Right, Logo, LogoImage, NavLinks, NavName, NavImage } from './NavbarStyle'
import Dropdown from './dropdown/Dropdown'
import NavbarIcons from "./navbarIcons/NavbarIcons"

const Navbar: React.FC = () => {

  const user = useTypedSelector<UserType | null>(state => state.userSlice.user)
  const navigate = useNavigate()

return (
<Container>
      <Left onClick={() => {
        navigate("/");
        window.location.reload();
      }}>
          <LogoImage src="/logo.png"/>
          <Logo>Headbook</Logo>
      </Left>
      <Center>
        <NavLinks onClick={() => navigate(`/profile/${user?._id}`)}>
          <NavImage src={user?.profilePicture ? user?.profilePicture : "/no-avatar.png"} alt=""/>
          <NavName>{user?.userName?.toUpperCase()}</NavName>
        </NavLinks>
      </Center>
      <Right>
        <NavbarIcons/>
        <Dropdown/>
      </Right>
</Container>
)}

export default Navbar