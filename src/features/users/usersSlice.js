import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const USERS_URL = 'https://jsonplaceholder.typicode.com/users';

const initialState = []

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const response = await axios.get(USERS_URL);
    return response.data
})

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            return action.payload;
        })
    }
})

// user is being returned as an object, so we have to explicitly convert in into array of users
export const selectAllUsers = (state) => Object.values(state.users)

export const selectUserById = (state, userId) =>
    Object.values(state.users).find(user => user.id === userId)

export default usersSlice.reducer