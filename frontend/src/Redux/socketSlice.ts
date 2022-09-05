import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface State {
    socket: any
}

const socketSlice = createSlice({
    name: 'socket',
    initialState: {
        socket: null
    },
    reducers: {
        getSocket: (state: State, action: PayloadAction<any>) => {
            state.socket = action.payload
        },
}
})

const { actions, reducer } = socketSlice

export const { getSocket } = actions;

export default reducer