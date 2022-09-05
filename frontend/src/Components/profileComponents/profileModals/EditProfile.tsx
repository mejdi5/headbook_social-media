import React, {useState, FormEvent} from 'react'
import { Modal, ModalHeader, ModalBody, Form, Button, Label, FormGroup} from 'reactstrap';
import { useTypedDispatch, useTypedSelector } from '../../../Redux/Hooks'
import { getUser, UserType } from '../../../Redux/userSlice';
import { Axios } from '../../../Axios';
import styled from "styled-components"


interface Props {
    showUserModal: boolean;
    setShowUserModal: React.Dispatch<React.SetStateAction<boolean>>;
    setMsg: React.Dispatch<React.SetStateAction<string | null>>,
    setError: React.Dispatch<React.SetStateAction<string | null>>
}

const Edit = styled.div`
display: flex;
justify-content: center;
height: 45px;
`

const Input = styled.input`
`
const TextArea = styled.textarea`
`
const FormFooter = styled.div`
display: flex;
flex-direction: column;
align-items: center
`

const EditProfile: React.FC<Props> = ({showUserModal, setShowUserModal, setMsg, setError}) => {

    const dispatch = useTypedDispatch()
    const user = useTypedSelector<UserType | null>(state => state.userSlice.user)

    const [userName, setUserName] = useState(user?.userName || "")
    const [description, setDescription] = useState(user?.description || "")
    const [country, setCountry] = useState(user?.address?.country || undefined)
    const [city, setCity] = useState(user?.address?.city || undefined)
    const [relationship, setRelationship] = useState(user?.relationship || undefined || null)
    const [job, setJob] = useState(user?.job || undefined)

    const handleEditUser = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const editedUser = {
                userName,
                description,
                address: {
                    country,
                    city
                },
                relationship,
                job
            }
            const res = await Axios.put(`/users/${user?._id}`, editedUser)
            setMsg(res.data.msg)
            dispatch(getUser(res.data.editedUser))
            setTimeout(() => {
                setMsg(null)
            }, 4000)
        } catch (error: any) {
            console.log(error)
            setError(error?.message)
            setTimeout(() => {
                setError(null)
            }, 4000)
        }
        setShowUserModal(false)
    }


return (
<Edit>
<Button 
onClick={() => setShowUserModal(true)}
color="success" 
>Edit Profile</Button>
<Modal isOpen={showUserModal} toggle={() => setShowUserModal(!showUserModal)}>
    <ModalHeader toggle={() => setShowUserModal(!showUserModal)}>Edit Profile</ModalHeader>
    <ModalBody>
    <Form>
        <FormGroup>
            <Label>UserName</Label>
            <Input
            className="form-control"
            placeholder="username.."
            value={userName}
            onChange={e => setUserName(e.target.value)}
            />
        </FormGroup>
        <FormGroup>
            <Label>Bio</Label>
            <TextArea
            className="form-control"
            placeholder="description.."
            value={description}
            onChange={e => setDescription(e.target.value)}
            />
        </FormGroup>
        <FormGroup>
            <Label>Country</Label>
            <Input 
            type="text" 
            className="form-control"
            placeholder="country.."
            value={country}
            onChange={e => setCountry(e.target.value)}
            />
        </FormGroup>
        <FormGroup>
            <Label>City</Label>
            <Input 
            type="text" 
            className="form-control"
            placeholder="city.."
            value={city}
            onChange={e => setCity(e.target.value)}
            />
        </FormGroup>
        <FormGroup>
            <Label>Job</Label>
            <Input 
            type="text" 
            className="form-control"
            placeholder="Job.."
            value={job}
            onChange={e => setJob(e.target.value)}
            />
        </FormGroup>
        <FormGroup>
            <Label>Relationship</Label>
            <select 
            className="form-select" 
            aria-label="Default select example"
            onChange={e => {
                if(e.target.value !== "none") {
                    setRelationship(e.target.value)
                } else {
                    setRelationship(null)
                }
            }}
            >
                <option value={user?.relationship ? user?.relationship : "none"}>Select Option</option>
                <option value="Single">Single</option>
                <option value="Engaged">Engaged</option>
                <option value="Married">Married</option>
                <option value="Divorced">Divorced</option>
                <option value="Widow">Widow</option>
                <option value="none">I don't want to say</option>
            </select>
        </FormGroup>
    <FormFooter>
        <Button 
        onClick={e => handleEditUser(e)}
        color="primary"
        >Submit</Button>
    </FormFooter>
    </Form>
    </ModalBody>
</Modal>
</Edit>
)}

export default EditProfile