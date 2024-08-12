import React, { useState } from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { combineReducers } from "redux";
import contactReducer from "../redux/reducers/contactReducer"; 
import ContactFavorite from "./ContactFavorite";

// Basic store setup for Storybook
const rootReducer = combineReducers({
  contact: contactReducer, // Combine the contact reducer with other reducers if needed
});

// Create the Redux store with initial state
const store = createStore(rootReducer, {
  contact: {
    contacts: [
      {
        id: "1",
        first_name: "John",
        last_name: "Doe",
        email: "john.doe@example.com",
        avatar: "https://robohash.org/johndoe.png",
        favorite: true,
      },
      {
        id: "2",
        first_name: "Jane",
        last_name: "Doe",
        email: "jane.doe@example.com",
        avatar: "https://robohash.org/janedoe.png",
        favorite: true,
      },
    ],
    totalPagesFavorite: 1, // Initial state for pagination
  },
});

// Export Storybook metadata for ContactFavorite component
export default {
  title: "Components/ContactFavorite", // Title in Storybook sidebar
  component: ContactFavorite, // Component being documented
  decorators: [
    (Story) => (
      // Wrap the story in a Redux Provider with the configured store
      <Provider store={store}>
        <Story />
      </Provider>
    ),
  ],
};

// Template for creating stories with state management
const Template = (args) => {
  const [page, setPage] = useState(1); // Manage local page state for pagination
  return <ContactFavorite {...args} page={page} setPage={setPage} />;
};

// Default story example with initial arguments
export const Default = Template.bind({});
Default.args = {}; // No additional arguments for default story
