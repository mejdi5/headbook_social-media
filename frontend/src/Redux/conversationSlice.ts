import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MessageType } from "./messageSlice";

export interface ConversationType {
    _id: string | undefined,
    senderId: string | null,
    receiverId: string | null,
    lastMessage?: MessageType | null
}

interface State {
    conversation: ConversationType | null,
    conversations: ConversationType[] | never[],
    chatbotConversations: ConversationType[] | never[],
    hiddenChatbotConversations: ConversationType[] | never[]
}


const conversationSlice = createSlice({
    name: 'conversation',
    initialState: {
        conversation: null, 
        conversations: [],
        chatbotConversations: [],
        hiddenChatbotConversations: []
    },
    reducers: {
        getConversation: (state: State, action: PayloadAction<ConversationType | null>) => {
            state.conversation = action.payload
        },

        getAllUserConversations: (state: State, action: PayloadAction<ConversationType[]>) => {
            state.conversations = action.payload.sort((a,b) => b.lastMessage ? 1 : -1).sort((a,b) => (b.senderId !== b.receiverId && !a.lastMessage) ? 1 : -1)
        },

        getChatbotConversations: (state: State, action: PayloadAction<ConversationType[]>) => {
            state.chatbotConversations = action.payload
        },

        getHiddenChatbotConversations: (state: State, action: PayloadAction<ConversationType[]>) => {
            state.hiddenChatbotConversations = action.payload
        },
}
})

const { actions, reducer } = conversationSlice

export const { 
    getConversation,
    getAllUserConversations,
    getChatbotConversations,
    getHiddenChatbotConversations
} = actions;

export default reducer