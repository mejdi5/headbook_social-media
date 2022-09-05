import React, {useRef, useState, FormEvent} from 'react'
import { Modal, ModalHeader, ModalBody, Form, Button, Label, FormGroup} from 'reactstrap';
import { auth } from '../../firebase'
import { Required, Input, Agreement, AgreementCheckbox, AgreementText, PasswordMatch, PasswordNotMatch, FormFooter, ErrorMessage} from './RegisterStyle'
import { useTypedDispatch, useTypedSelector } from '../../Redux/Hooks'
import { getUser, load, getError } from '../../Redux/userSlice';
import { Axios } from "../../Axios"


interface Props {
    showRegisterModal: boolean,
    setShowRegisterModal: React.Dispatch<React.SetStateAction<boolean>>
}


const Register: React.FC<Props> = ({showRegisterModal, setShowRegisterModal}) => {

    const dispatch = useTypedDispatch()

    const [userName, setUserName] = useState("")
    const email = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null)
    const confirmedPassword = useRef<HTMLInputElement>(null)
    const [isChecked, setIsChecked] = useState(false)
    const [isMatch, setIsMatch] = useState(false)
    const error = useTypedSelector<any>(state => state.userSlice.error)

    const handleRegister = async (e: FormEvent) => {
        e.preventDefault();
        dispatch(load(true))
        try {
            if(email?.current?.value && password?.current?.value) {
                const firebaseAuthResponse = await auth.createUserWithEmailAndPassword(
                    email?.current?.value,
                    password?.current?.value
                )
                if (firebaseAuthResponse) {
                const newUser = {
                    userName,  
                    email: firebaseAuthResponse.user?.email,
                    profilePicture: null,
                    coverPicture: null,
                    description: null,
                    relationship: null,
                    address: {
                        country: null,
                        city: null
                    },
                    job: null,
                    friends: []
                }
                const res = await Axios.post('/users', newUser)
                dispatch(load(false))
                dispatch(getUser(res.data.savedUser))
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
    <Modal isOpen={showRegisterModal} toggle={() => setShowRegisterModal(!showRegisterModal)}>
    <ModalHeader toggle={() => setShowRegisterModal(!showRegisterModal)}>Sign Up</ModalHeader>
    <ModalBody>
    <Form>
    <FormGroup>
        <Label>User Name <Required>*</Required></Label>
        <Input 
        type="text" 
        className="form-control"
        placeholder="User Name.."
        onChange={e => setUserName(e.target.value)}
        required
        />
    </FormGroup>
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
        onChange={(e) => { 
            if(password.current) {
            password.current.value = e.target.value;
            setIsMatch(password?.current?.value === confirmedPassword?.current?.value)
        }}
        }
        />
    </FormGroup>
    <FormGroup>
        <Label>Confirm Password <Required>*</Required></Label>
        <Input 
        type="password" 
        placeholder="Retype Password.."
        required 
        className="form-control"
        ref={confirmedPassword}
        onChange={(e) => { 
            if(confirmedPassword.current) {
            confirmedPassword.current.value = e.target.value;
            setIsMatch(password?.current?.value === confirmedPassword?.current?.value)
        }}
        }
        />
        {isMatch 
        ? <PasswordMatch>Password matched</PasswordMatch>
        : <PasswordNotMatch>Password does not match</PasswordNotMatch>
        }
    </FormGroup>
    <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
        <ErrorMessage>{error && error.message?.split("Firebase:")?.join("")}</ErrorMessage>
    </div>
    <FormFooter>
        <Agreement>
            <AgreementCheckbox 
            className="form-check-input" 
            type="checkbox" 
            onChange={() => setIsChecked(!isChecked)}
            />
            <AgreementText>I accept the processing of my personal data and privacy policy</AgreementText>
        </Agreement>
        <Button 
        onClick={e => handleRegister(e)}
        color="primary"
        disabled={
            !isChecked || 
            !isMatch || 
            userName === "" || 
            email?.current?.value === "" || 
            password?.current?.value === ""
        }
        >Submit</Button>
    </FormFooter>
    </Form>
    </ModalBody>
</Modal>
)}

export default Register