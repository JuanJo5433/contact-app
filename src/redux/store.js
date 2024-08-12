import { configureStore } from "@reduxjs/toolkit";
import contactReducer from "./reducers/contactReducer";

// Configure and create the Redux store
const store = configureStore({
    reducer: {
        // The 'contact' slice of the state is managed by contactReducer
        contact: contactReducer,
    },
    devTools: process.env.NODE_ENV !== 'production', // Enable Redux DevTools only in development mode
});

export default store; // Export the store for use in the application
