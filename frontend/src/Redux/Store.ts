import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {persistStore, persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";
import userSlice from './userSlice'
import postSlice from './postSlice'
import invitationSlice from './invitationSlice'
import socketSlice from './socketSlice'
import notificationSlice from './notificationSlice'
import conversationSlice from './conversationSlice'
import messageSlice from './messageSlice'

const persistConfig = {
    key: "root",
    version: 1,
    storage,
};

const rootReducer = combineReducers({ 
    userSlice,
    postSlice,
    invitationSlice,
    socketSlice,
    notificationSlice,
    conversationSlice,
    messageSlice
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const Store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
        serializableCheck: false,
    }),
});

export let persistor = persistStore(Store);