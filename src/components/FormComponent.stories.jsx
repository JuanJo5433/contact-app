import React from 'react';
import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { Provider as ReduxProvider } from 'react-redux';
import FormComponent from './FormComponent';
import contactReducer from '../redux/reducers/contactReducer';

// Combine reducers to create the root reducer for the store
const rootReducer = combineReducers({
  contact: contactReducer,
});

// Configure the Redux store with the root reducer
const store = configureStore({
  reducer: rootReducer,
});

// Export Storybook metadata for the FormComponent
export default {
  title: 'Components/FormComponent', // Title for the component in Storybook sidebar
  component: FormComponent, // Component being documented
  decorators: [
    (Story) => (
      // Wrap story in Redux Provider to provide the store context to the component
      <ReduxProvider store={store}>
        <Story />
      </ReduxProvider>
    ),
  ],
};

// Template function to render the FormComponent with given args
const Template = (args) => <FormComponent {...args} />;

// Default story showcasing the FormComponent
export const Default = Template.bind({});
Default.args = {}; // Default arguments for the FormComponent story
