import React from 'react'
import styled from "styled-components"
import { Spinner } from "reactstrap"

const Container = styled.div`
width: 100vw;
height: 100vh;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
gap: 30px;
font-size: 50px
`

const Loading: React.FC = () => {
return (
<Container>
    <Spinner type="grow" color="dark"/> 
    <h4>Loading..</h4>
</Container>
)}

export default Loading