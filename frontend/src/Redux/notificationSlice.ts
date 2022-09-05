import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "./userSlice";

export interface NotificationType {
    _id?: string,
    postId?: string | null,
    conversationId?: string | null,
    notificationSender: string;
    notificationReceiver: string;
    text: string
}

interface State {
    notifications: NotificationType[] | never[],
}

const notificationSlice = createSlice({
    name: 'notification',
    initialState: {
        notifications: [],
    },
    reducers: {
        getAllNotifications: (state: State, action: PayloadAction<NotificationType[]>) => {
            state.notifications = action.payload
        },
}
})

const { actions, reducer } = notificationSlice

export const { getAllNotifications } = actions;

export default reducer