import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "./userSlice"

export interface CommentType {
    _id: string,
    commentatorId: string,
    text: string | null,
    date: number
}

export interface PostType {
    _id: string | undefined,
    userId: string | null,
    description: string | null,
    photo: string | null,
    createdAt: string,
    likers: string[] | never[],
    comments: CommentType[] | never[]
}

interface State {
    post: PostType | null,
    posts: PostType[] | never[]
}


const postSlice = createSlice({
    name: 'post',
    initialState: {
        post: null, 
        posts: []
    },
    reducers: {
        getPost: (state: State, action: PayloadAction<PostType | null>) => {
            state.post = action.payload
        },

        getAllPosts: (state: State, action: PayloadAction<PostType[]>) => {
            state.posts = action.payload
        },
}
})

const { actions, reducer } = postSlice

export const { 
    getPost,
    getAllPosts,
} = actions;

export default reducer