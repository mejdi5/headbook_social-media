import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface MessageType {
    _id: string | undefined,
    conversationId: string | null,
    senderId: string | null,
    text: string | null,
    date: any
}

interface State {
    messages: MessageType[] | never[],
    chatbotConversationMessages: MessageType[] | never[]
}


const messageSlice = createSlice({
    name: 'message',
    initialState: {
        messages: [],
        chatbotConversationMessages: []
    },
    reducers: {

        getAllConversationMessages: (state: State, action: PayloadAction<MessageType[]>) => {
            state.messages = action.payload
        },

        getAllChatbotConversationMessages: (state: State, action: PayloadAction<MessageType[]>) => {
            state.chatbotConversationMessages = action.payload
        },
}
})

const { actions, reducer } = messageSlice

export const { 
    getAllConversationMessages,
    getAllChatbotConversationMessages
} = actions;

export default reducer