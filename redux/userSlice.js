
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.user = action.payload
            localStorage.setItem('user', JSON.stringify(action.payload))
        },
        removeCredentials: (state) => {
            state.user = null
            localStorage.removeItem('user');
        }
    },
});

// Check localStorage and set the initial state after the component mounts
export const loadUserFromLocalStorage = (dispatch) => {
    if (typeof window !== 'undefined') {
        const user = localStorage.getItem('user');
        if (user) {
            return dispatch(setCredentials(JSON.parse(user)));
        } else {
            return
        }
    }
};
export const { setCredentials, removeCredentials } = userSlice.actions;
export default userSlice.reducer;
