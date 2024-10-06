// store/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from "./userSlice"; // Import user slice

const store = configureStore({
    reducer: {
        user: userReducer, // Add user slice to the store
    },
});

export default store;
