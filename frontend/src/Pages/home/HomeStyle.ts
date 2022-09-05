import styled from "styled-components"
import { css } from "styled-components";

const responsive = (props: any) => {
    return css`
    @media only screen and (max-device-width: 500px) {
    ${props}
    }
`};

export const Container = styled.div`
width: 100vw;
height: 100vh;
background-color: #f0f2f5;
display: flex;
align-items: center;
justify-content: center;
`

export const Wrapper = styled.div`
width: 40%;
height: 600px;
display: flex;
flex-direction: column;
background-color: white;
border-radius: 15px;
${responsive({height:  "80vh", width: '90vw', justifyContent: 'center' })}
`

export const Header = styled.div`
flex: 1;
display: flex;
flex-direction: column;
justify-content: center;
margin: 5% 5%;
`

export const Body = styled.div`
flex: 4;
display: flex;
flex-direction: column;
justify-content: center;
margin: 5% 5% 0% 5%;
`
export const Footer = styled.div`
flex: 0.2;
display: flex;
justify-content: center;
align-items: center;
margin: 0% 4% 2% 4%;
${responsive({height: '50px'})}
`

export const Logo = styled.h3`
font-size: 50px;
font-weight: 800;
color: #1775ee;
margin-bottom: 10px;
${responsive({fontSize: '80px'})}
`
export const Description = styled.span`
font-size: 24px;
${responsive({fontSize: '50px'})}
`

export const FormFooter = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
${responsive({fontSize: '30px'})}
`

export const Required = styled.span`
color: red
`
export const Label = styled.span`
${responsive({height: '70px', fontSize: '40px'})}
`

export const Input = styled.input`
border-radius: 10px;
${responsive({height: '50px', fontSize: '35px'})}
`

export const ErrorMessage = styled.span`
color: red;
font-size: 15px;
margin-bottom: 5px
`

