import styled from "styled-components"

export const Required = styled.span`
color: red
`

export const Input = styled.input`
`

export const FormFooter = styled.div`
display: flex;
flex-direction: column;
align-items: center
`

export const Agreement = styled.div`
margin-bottom: 5vh
`

export const AgreementCheckbox = styled.input`
cursor: pointer;
`

export const AgreementText = styled.span`
font-size: 15px;
margin: 20px 10px;
text-decoration: underline;
`
export const PasswordMatch = styled.p`
color: green;
font-size: 13px;
`
export const PasswordNotMatch = styled.p`
color: red;
font-size: 13px;
`
export const ErrorMessage = styled.span`
color: red;
font-size: 15px;
margin-bottom: 5px
`