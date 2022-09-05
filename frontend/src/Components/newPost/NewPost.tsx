import React,{ FormEvent, useEffect, useRef, useState } from "react";
import { useTypedDispatch, useTypedSelector } from '../../Redux/Hooks'
import { UserType } from '../../Redux/userSlice'
import { Container, Wrapper, Top, ProfileImage, PostInput, PostHr, Bottom, Options, Option, OptionText, OptionInput, OptionsButton, FileContainer, UploadedImage} from "./NewPostStyle"
import { MdPermMedia, MdCancel } from 'react-icons/md'
import { Axios } from '../../Axios'
import { getAllPosts } from "../../Redux/postSlice"
import { useParams } from 'react-router-dom'
import { ErrorMessage } from "./NewPostStyle";
import { storage } from '../../firebase'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const NewPost: React.FC = () => {
    
    let description = useRef<HTMLInputElement>(null);
    const [file, setFile] = useState<any>(null);
    const [picture, setPicture] = useState<string | null>(null);
    const [percentage, setPercentage] = useState<number | null>(null);
    const dispatch = useTypedDispatch()
    const user = useTypedSelector<UserType | null>(state => state.userSlice.user)
    const param = useParams().userId
    const [error, setError] = useState<any>(null)

    const handleAddPost = async (e: FormEvent) => {
        e.preventDefault();
        try {
            if(description?.current?.value !== "" || picture) {
                await Axios.post('/posts', { 
                    userId: user?._id,
                    description: description?.current?.value,
                    photo: picture,
                    createdAt: Date.now(),
                    likers: [],
                    comments: []
                })
                if(description.current) {
                    description.current.value = ""
                } 
                const res = await Axios.get(param ? `/posts/user/${param}` : '/posts')
                dispatch(getAllPosts(res.data));
            } else {
                setError("Cannot add an empty post")
                setTimeout(() => {
                    setError(null)
                }, 4000)
            }
        } catch (error) {
            console.log(error)
            setError(error)
            if(description.current) {
                description.current.value = ""
            } 
            setTimeout(() => {
                setError(null)
            }, 4000)
        }
        setFile(null)
    }

    const uploadFile = () => {
        const name = new Date().getTime() + file.name;
    
        console.log(name);
        const storageRef = ref(storage, file.name);
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
            }
            },
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
            file && uploadFile();
        }, [file]);

if (!param || param === user?._id) {
return (
<Container>
    {error && <ErrorMessage>Cannot add this post</ErrorMessage>}
    <Wrapper>
        <Top>
            <ProfileImage
            src={user?.profilePicture ? user?.profilePicture : "/no-avatar.png"}
            alt=""
            />
            <PostInput
            placeholder="Say something..."
            ref={description}
            />
        </Top>
        <PostHr/>
        {file && (
            <FileContainer>
                {picture
                ?
                <>
                <UploadedImage src={URL.createObjectURL(file)} alt="" />
                <MdCancel 
                style={{position: 'absolute', top: 0, right: '0', cursor: 'pointer'}} 
                onClick={() => setFile(null)} 
                color="red"
                />
                </>
                : 
                <div>Uploading...</div>
                }
            </FileContainer>
        )}
        <Bottom>
            <Options>
                <Option>
                    <MdPermMedia style={{fontSize: '18px', marginRight: '3px'}} color="red"/>
                    <OptionText>Photo or Video</OptionText>
                    <OptionInput
                    type="file"
                    id="file"
                    onChange={(e) => e.target.files && setFile(e.target.files[0])}
                    />
                </Option>
            </Options>
            <OptionsButton 
            disabled={(!description?.current?.value || description?.current?.value === "") && (!picture|| picture === "")}
            onClick={e => handleAddPost(e)}>Publish</OptionsButton>
        </Bottom>
    </Wrapper>
</Container>
)} else {
    return (
        <div></div>
    )
}
}
export default NewPost