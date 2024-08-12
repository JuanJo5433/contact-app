import React, { useState } from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { combineReducers } from "redux";
import contactReducer from "../redux/reducers/contactReducer"; 
import ContactList from "./ContactList";
import CardContact from "./CardContactComponent";

// Basic store setup for Storybook with initial state
const rootReducer = combineReducers({
  contact: contactReducer, // Combines the contactReducer into the root reducer
});

// Create Redux store with an initial state for contacts
const store = createStore(rootReducer, {
  contact: {
    contacts: [
      {
        id: "1",
        first_name: "John",
        last_name: "Doe",
        email: "john.doe@example.com",
        avatar: "https://robohash.org/johndoe.png",
        favorite: true, // Indicates this contact is a favorite
      },
      {
        id: "2",
        first_name: "Jane",
        last_name: "Doe",
        email: "jane.doe@example.com",
        avatar: "https://robohash.org/janedoe.png",
        favorite: false, // Indicates this contact is not a favorite
      },
    ],
    totalPagesFavorite: 1, // Initial value for the total number of pages for favorite contacts
  },
});

// Storybook metadata for the ContactList component
export default {
  title: "Components/ContactList", // Title for the component in Storybook sidebar
  component: ContactList, // Component being documented
  decorators: [
    (Story) => (
      // Wrap story in Redux Provider to supply the store context to the component
      <Provider store={store}>
        <Story />
      </Provider>
    ),
  ],
};

// Template function to manage component state in Storybook
const Template = (args) => {
  const [page, setPage] = useState(1); // Local state for managing pagination
  return <ContactList {...args} page={page} setPage={setPage} />;
};

// Default story showcasing the ContactList component
export const Default = Template.bind({});
Default.args = {}; // Default arguments for the ContactList story
