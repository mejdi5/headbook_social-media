import React,{useState, FormEvent, useEffect} from 'react'
import { useTypedDispatch, useTypedSelector } from "../../../Redux/Hooks"
import { UserType, getUser } from '../../../Redux/userSlice'
import {useParams} from 'react-router-dom'
import {Axios} from "../../../Axios"
import { storage } from '../../../firebase'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { UserImagesWrapper, CoverImage, ProfileImage, UploadCoverImageInput, UploadProfileImageInput, UploadProfileImageButton, UploadCoverImageButton} from './UserImagesStyle'


interface Props {
    setMsg: React.Dispatch<React.SetStateAction<string | null>>,
    setError: React.Dispatch<React.SetStateAction<any>>
}

const UserImages: React.FC<Props> = ({setMsg, setError}) => {

    const users = useTypedSelector<UserType[] | never[]>(state => state.userSlice.users)
    const user = useTypedSelector<UserType | null>(state => state.userSlice.user)
    const [coverFile, setCoverFile] = useState<any>(null);
    const [profileFile, setProfileFile] = useState<any>(null);
    const [picture, setPicture] = useState<string | null>(null);
    const [percentage, setPercentage] = useState<number | null>(null);
    const dispatch = useTypedDispatch()
    const userId = useParams().userId
    const profileUser = users.find(user => user?._id === userId)


    const handleEditProfileImage = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const res = await Axios.put(`/users/${user?._id}`, {
                profilePicture: picture
            })
            setMsg("Image edited..")
            dispatch(getUser(res.data.editedUser))
            setTimeout(() => {
                setMsg(null)
            }, 4000)
            window.location.reload()
        } catch (error) {
            console.log(error)
            setError(error)
            setTimeout(() => {
                setError(null)
            }, 4000)
        }
        setPercentage(null)
    }

    const handleEditCoverImage = async (e: FormEvent) => {
        e.preventDefault();
        try {
            
            const res = await Axios.put(`/users/${user?._id}`, {
                coverPicture: picture
            })
            setMsg("Image edited..")
            dispatch(getUser(res.data.editedUser))
            setTimeout(() => {
                setMsg(null)
            }, 4000)
            window.location.reload()
        } catch (error) {
            console.log(error)
            setError(error)
            setTimeout(() => {
                setError(null)
            }, 4000)
        }
        setPercentage(null)
    }


    const uploadFile = (file: any) => {
        const name = new Date().getTime() + file.name;
        const storageRef = ref(storage, name);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
            const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            setPercentage(progress);
            switch (snapshot.state) {
                case "paused":
                console.log("Upload is paused");
                break;
                case "running":
                console.log("Upload is running");
                break;
                default:
                break;
            }},
            (error) => {
            console.log(error);
            },
            () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                console.log('File available at', downloadURL);
                setPicture(downloadURL)
            });
            }
        );
        };

    useEffect(() => {
        coverFile && uploadFile(coverFile);
    }, [coverFile]);

    useEffect(() => {
        profileFile && uploadFile(profileFile);
    }, [profileFile]);



return (
<UserImagesWrapper>
    <div>
        <CoverImage
        src={profileUser?.coverPicture 
            ? profileUser?.coverPicture
            : "/no-cover.jpg"
        }
        alt=""
        />
        {user?._id === userId && 
        <UploadCoverImageInput
        type="file"
        id="file"
        accept=".png,.jpeg,.jpg"
        onChange={(e) => e.target.files && setCoverFile(e.target.files[0])}
        />
        }
        {user?._id === userId && (coverFile || profileFile) && percentage &&  percentage > 0 && percentage < 100 && 
            <div style={{color: 'orange'}}>Please wait..</div>
        }
        {user?._id === userId && coverFile && percentage === 100 && (
        <UploadCoverImageButton onClick={e => handleEditCoverImage(e)}>
            Click to Upload
        </UploadCoverImageButton>
        )}
    </div>
    <div>
        <ProfileImage
        src={profileUser?.profilePicture
            ? profileUser?.profilePicture
            : "/no-avatar.png"
        }
        alt=""
        />
        {user?._id === userId && 
        <UploadProfileImageInput
        type="file"
        id="file"
        accept=".png,.jpeg,.jpg"
        onChange={(e) => e.target.files && setProfileFile(e.target.files[0])}
        />
        }
        {user?._id === userId && profileFile &&  percentage === 100 &&
        <UploadProfileImageButton onClick={e => handleEditProfileImage(e)}>
            Click to Upload
        </UploadProfileImageButton>
        }
    </div>
</UserImagesWrapper>
)}

export default UserImages