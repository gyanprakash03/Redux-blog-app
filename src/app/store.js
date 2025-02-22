import { configureStore } from "@reduxjs/toolkit";
import storageSession from "redux-persist/lib/storage/session";
import { persistStore, persistReducer } from "redux-persist";
import postsReducer from '../features/posts/postsSlice';
import usersReducer from '../features/users/usersSlice';

const postsPersistConfig = {
    key: "postsData",  // post data will be stored under this key
    storage: storageSession, // data will be stored in sesssion storage
};
  
const usersPersistConfig = {
    key: "usersData", // user data will be stored under this key
    storage: storageSession,
};

// assign reducer data to their respective keys
const persistedPostsReducer = persistReducer(postsPersistConfig, postsReducer);
const persistedUsersReducer = persistReducer(usersPersistConfig, usersReducer);

export const store = configureStore({
    reducer: {
        posts: persistedPostsReducer,
        users: persistedUsersReducer,
    },
    // redux-persist uses non serializable value like functions, 
    // but redux expects all actions and state to be serializable
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // Ignore these action types
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
                // Ignore these paths in the state
                ignoredPaths: ['register', 'rehydrate'],
            },
        }
    ),
});

export const persistor = persistStore(store); // sync store with storage