import React, {useRef, useState, FormEvent, useEffect} from 'react'
import { Modal, ModalHeader, ModalBody, Form, Button, Label, FormGroup} from 'reactstrap';
import { useTypedDispatch, useTypedSelector } from '../../../Redux/Hooks'
import { UserType } from '../../../Redux/userSlice';
import { getAllPosts, PostType } from '../../../Redux/postSlice';
import { Axios } from '../../../Axios';
import styled from "styled-components"


interface Props {
    showPostModal: boolean;
    setShowPostModal: React.Dispatch<React.SetStateAction<boolean>>;
    setMsg: React.Dispatch<React.SetStateAction<string | null>>,
    setEditError: React.Dispatch<any>,
    post : PostType
}


const TextArea = styled.textarea`
`

const FormFooter = styled.div`
display: flex;
flex-direction: column;
align-items: center
`

const EditPostModal: React.FC<Props> = ({showPostModal, setShowPostModal, setMsg, setEditError, post}) => {

    const dispatch = useTypedDispatch()
    const user = useTypedSelector<UserType | null>(state => state.userSlice.user)

    const [description, setDescription] = useState(post?.description || "")

    const handleEditPost = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const editedPost = {
                userId: user?._id,
                description
            }
            const res = await Axios.put(`/posts/${post?._id}`, editedPost)
            setMsg(res.data.msg)
            setTimeout(() => {
                setMsg(null)
            }, 4000)
        } catch (error) {
            console.log(error)
            setEditError(error)
            setTimeout(() => {
                setEditError(null)
            }, 4000)
        }
        setShowPostModal(false);
    }

return (
<Modal isOpen={showPostModal} toggle={() => setShowPostModal(!showPostModal)}>
    <ModalHeader toggle={() => setShowPostModal(!showPostModal)}>Edit Post</ModalHeader>
    <ModalBody>
    <Form>
        <FormGroup>
            <TextArea
            className="form-control"
            value={description}
            onChange={e => setDescription(e.target.value)}
            />
        </FormGroup>
    <FormFooter>
        <Button 
        onClick={(e) => handleEditPost(e)}
        color="success"
        >Save</Button>
    </FormFooter>
    </Form>
    </ModalBody>
</Modal>
)}

export default EditPostModal