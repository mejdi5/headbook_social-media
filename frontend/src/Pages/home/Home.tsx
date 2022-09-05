import React, {FormEvent, useRef, useState} from 'react'
import { Form, Button, FormGroup} from 'reactstrap';
import {Link} from 'react-router-dom'
import { auth } from '../../firebase'
import { Container, Wrapper, Header, Body, Footer, Logo, Description,Label, Input, Required, ErrorMessage, FormFooter } from './HomeStyle'
import Register from '../../Components/register/Register';
import { useTypedDispatch, useTypedSelector } from '../../Redux/Hooks'
import { getUser, load, getError } from '../../Redux/userSlice';
import { Axios } from '../../Axios';



const Home: React.FC = () => {

    const dispatch = useTypedDispatch()
    const email = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null)
    const error = useTypedSelector<any>(state => state.userSlice.error)
    const [showRegisterModal, setShowRegisterModal] = useState(false);

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();
        dispatch(load(true))
        try {
            if(email?.current?.value && password?.current?.value) {
            const firebaseAuthResponse = await auth.signInWithEmailAndPassword(
                email?.current?.value,
                password?.current?.value
            )
            if (firebaseAuthResponse) {
            const res = await Axios.get(`users/${firebaseAuthResponse.user?.email}`)
            dispatch(load(false))
            dispatch(getUser(res.data))
            }}
        } catch (error) {
            console.log(error)
            dispatch(load(false))
            dispatch(getError(error))
            setTimeout(() => {
                dispatch(getError(null))
            }, 5000)
        }
    }


return (
<Container>
    <Wrapper>
        <Header>
            <Logo>Headbook</Logo>
            <Description>
            Connect with friends and the people around you.
            </Description>
        </Header>
        <Body>
            <Form>
                <FormGroup>
                    <Label>Email address <Required>*</Required></Label>
                    <Input 
                    type="email" 
                    className="form-control"
                    placeholder="email.."
                    ref={email}
                    required
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Password <Required>*</Required></Label>
                    <Input 
                    type="password" 
                    placeholder="Password.."
                    required 
                    className="form-control"
                    ref={password}
                    />
                </FormGroup>
                <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                    <ErrorMessage>{error && error.message?.split("Firebase:")?.join("")}</ErrorMessage>
                </div>
                <FormFooter>
                    <Link to="/forgot-password"><p className='login-link'>Forgot Password ?</p></Link>
                    <Button color="success" onClick={e => handleLogin(e)}>Sign In</Button>
                </FormFooter>
            </Form>
        </Body>
        <Footer>
            <Button 
            onClick={() => setShowRegisterModal(true)}
            color="primary" 
            size="lg" 
            block>Sign Up</Button>
            <Register
            showRegisterModal={showRegisterModal}
            setShowRegisterModal={setShowRegisterModal}
            />
        </Footer>
    </Wrapper>
</Container>
)}

export default Home