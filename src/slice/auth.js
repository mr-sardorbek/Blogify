import { createSlice } from "@reduxjs/toolkit";
import { setItem } from "../helpers/persistance-storage";

const initialState = {
    isLoading: false,
    loggedIn: false,
    error: null,
    user: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState, 
    reducers: {
        // Login 
        loginUserStart: state => {
            state.isLoading = true
        },
        loginUserSuccess: (state, action) => {
            state.loggedIn = true
            state.isLoading = false
            state.user = action.payload
            setItem("token", action.payload.token)
        },
        loginUserFailure: (state, action) => {
            state.isLoading = false
            state.error = action.payload
        },
        // Register 
         registerUserStart: state => {
            state.isLoading = true
        },
        registerUserSuccess: (state, action) => {
            state.loggedIn = true
            state.isLoading = false
            state.user = action.payload
            setItem("token", action.payload.token)
        },
        registerUserFailure: (state, action) => {
            state.isLoading = false
            state.error = action.payload
        },
        logoutUser: state => {
            state.user = null
            state.loggedIn = false
        }
        
    }
})

export const {loginUserStart, registerUserStart, registerUserSuccess, registerUserFailure,
    loginUserSuccess, loginUserFailure, logoutUser
} = authSlice.actions
export default authSlice.reducer