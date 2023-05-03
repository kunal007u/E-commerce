import { createSlice } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const signupSlice = createSlice({
    name: 'signup',
    initialState: {
        signUpDetail: localStorage.getItem('signUpDetail') ? JSON.parse(localStorage.getItem('signUpDetail')) : {},
        loggedInDetail: localStorage.getItem('loggedInDetail') ? JSON.parse(localStorage.getItem('loggedInDetail')) : {},
        loggedIn: localStorage.getItem('loggedIn') ? JSON.parse(localStorage.getItem('loggedIn')) : false,
        userDetail: ""
    },
    reducers: {
        signup: (state, action) => {
            localStorage.setItem('signUpDetail', JSON.stringify({ ...action.payload }));
            state.signUpDetail = { ...action.payload };
            toast.success('You are logged in successfully');
            localStorage.setItem('loggedIn', JSON.stringify(true))
            state.loggedIn = true;
            state.userDetail = state.signUpDetail.firstName+" "+state.signUpDetail.lastName
        },
        login: (state, action) => {
            if (action.payload.email === state.signUpDetail.email && action.payload.password === state.signUpDetail.password) {
                localStorage.setItem('loggedInDetail', JSON.stringify(action.payload));
                state.loggedInDetail = action.payload;
                localStorage.setItem('loggedIn', JSON.stringify(true))
                toast.success('You are logged in successfully');
                state.loggedIn = true;
                

            } else {
                toast.error('Invalid credentials');
                localStorage.setItem('loggedIn', JSON.stringify(false))
                state.loggedIn = false;

            }
        },
        logout: (state) => {
            localStorage.removeItem('loggedInDetail');
            state.loggedInDetail = {};
            localStorage.removeItem("loggedIn")
            state.loggedIn = null;

        }
    }
});

export const { signup, login, logout } = signupSlice.actions;
export default signupSlice.reducer;

