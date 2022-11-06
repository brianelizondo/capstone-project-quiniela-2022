import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        id: null, 
        firstName: null, 
        lastName: null, 
        email: null, 
        username: null, 
        isAdmin: false,
        token: null,
        isAuthenticated: false
    },
    reducers: {
        login: (state, action) => {
            state.id = action.payload.user.id;
            state.firstName = action.payload.user.firstName;
            state.lastName = action.payload.user.lastName;
            state.email = action.payload.user.email;
            state.username = action.payload.user.username;
            state.isAdmin = action.payload.user.isAdmin;
            state.token = action.payload.token;
            state.isAuthenticated = true;
        },
        update: (state, action) => {
            state = action.payload
        },
        logout: (state) => {
            state.id = null;
            state.firstName = null;
            state.lastName = null;
            state.email = null;
            state.username = null;
            state.isAdmin = null;
            state.token = null;
            state.isAuthenticated = false;
        }
    }
})
  
// Action creators are generated for each case reducer function
export const { login, update, logout } = userSlice.actions;
export default userSlice.reducer;