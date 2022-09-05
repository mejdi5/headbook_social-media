import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export interface InvitationType {
    _id?: string | undefined,
    senderId: string,
    receiverId: string
}

interface State {
    invitations: InvitationType[] | never[],
    invitation: InvitationType | null
}

const invitationSlice = createSlice({
    name: 'invitation',
    initialState: {
        invitations: [],
        invitation: null
    },
    reducers: {
        getAllInvitations: (state: State, action: PayloadAction<InvitationType[]>) => {
            state.invitations = action.payload
        },

        getInvitation: (state: State, action: PayloadAction<InvitationType>) => {
            state.invitation = action.payload
        },
}
})

const { actions, reducer } = invitationSlice

export const { 
    getAllInvitations,
    getInvitation
} = actions;

export default reducer