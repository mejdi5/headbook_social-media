import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AiOutlineLogout, AiFillDelete, AiFillProfile, AiFillHome } from 'react-icons/ai'
import { IoIosArrowDropdownCircle } from 'react-icons/io'
import { auth } from '../../../firebase';
import { signOut } from "firebase/auth"
import { getAuth, deleteUser } from "firebase/auth";
import { Axios } from '../../../Axios'
import { useTypedDispatch, useTypedSelector } from '../../../Redux/Hooks'
import { getAllUsers, getUser, UserType } from '../../../Redux/userSlice'
import { confirmAlert } from 'react-confirm-alert'; 
import { 
    DropdownContainer,
    DropdownContent, 
    DropdownItem, 
    ProfileIcon,
    ProfileLabel,
    SignOutIcon,
    SignOutLabel,
    DeleteAccountIcon, 
    DeleteAccountLabel
} from './DropdownStyle'


const Dropdown: React.FC = () => {

    const dispatch = useTypedDispatch()
    const user = useTypedSelector<UserType | null>(state => state.userSlice.user)
    const navigate = useNavigate()

    const handleLogout = async () => {
    await signOut(auth);
    dispatch(getUser(null))
    dispatch(getAllUsers([]))
    }

    const handleDeleteUser = async (id: string | undefined) => {
    try {
    const auth = getAuth();
    if(auth.currentUser) {
        await deleteUser(auth.currentUser)
        await Axios.delete(`/users/${id}`)
        alert('This user is deleted..')
        dispatch(getUser(null))
        }
    } catch (error) {
        console.log(error)
        alert('Cannot delete this account, Log in again before retrying this request.')
    }
    }

    const confirmDeletingAccount = (id: string | undefined) => {
        confirmAlert({
            title: 'Delete Account',
            message: 'Do you really want to delete this account definitively ?',
            buttons: [
            {
                label: 'Yes',
                onClick: () => handleDeleteUser(id)
            },
            {
                label: 'No',
            }
        ]
        });
    };

return (
<DropdownContainer>
    <IoIosArrowDropdownCircle color="lightblue" style={{fontSize: '20px'}}/>
    <DropdownContent>
        <Link to="/" style={{textDecoration: 'none', color: 'white'}}>
            <DropdownItem>
                <ProfileIcon>
                    <AiFillHome/>
                </ProfileIcon>
                <ProfileLabel>
                    Home
                </ProfileLabel>
            </DropdownItem>
        </Link>
        <Link to={`/profile/${user?._id}`} style={{textDecoration: 'none', color: 'white'}}>
            <DropdownItem>
                <ProfileIcon>
                    <AiFillProfile/>
                </ProfileIcon>
                <ProfileLabel>
                    Profile
                </ProfileLabel>
            </DropdownItem>
        </Link>
        <DropdownItem onClick={() => handleLogout()}>
            <SignOutIcon>
                <AiOutlineLogout/>
            </SignOutIcon>
            <SignOutLabel>
                Sign Out
            </SignOutLabel>
        </DropdownItem>
        <DropdownItem onClick={() => confirmDeletingAccount(user?._id)}>
            <DeleteAccountIcon>
                <AiFillDelete/>
            </DeleteAccountIcon>
            <DeleteAccountLabel>
                Delete Account
            </DeleteAccountLabel>
        </DropdownItem>
    </DropdownContent>
</DropdownContainer>
)}

export default Dropdown