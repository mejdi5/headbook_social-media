import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Address{
    country: string | null,
    city: string | null
}

export interface UserType {
    _id?: string | undefined,
    userName: string | null | undefined,
    email: string | null | undefined,
    profilePicture: string | null,
    coverPicture: string | null,
    description: string | null,
    relationship: string | null,
    address: Address,
    job: string | null,
    friends: string[] 
}

interface State {
    user: UserType | null,
    users: UserType[] | never[],
    onlineUsers: UserType[] | never[],
    isLoading: boolean;
    error: any
}


const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null, 
        users: [],
        onlineUsers:[],
        isLoading: false,
        error: null
    },
    reducers: {
        load: (state: State, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload
        },

        getError: (state: State, action: PayloadAction<any>) => {
            state.error = action.payload
        },

        getUser: (state: State, action: PayloadAction<UserType | null>) => {
            state.user = action.payload
        },

        getAllUsers: (state: State, action: PayloadAction<UserType[]>) => {
            state.users = action.payload
        },

        getOnlineUsers: (state: State, action: PayloadAction<UserType[]>) => {
            state.onlineUsers = action.payload
        },
}
})

const { actions, reducer } = userSlice

export const { 
    load,
    getError,
    getUser,
    getAllUsers,
    getOnlineUsers
} = actions;

export default reducer