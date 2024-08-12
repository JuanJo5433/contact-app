import React from 'react';
import { action } from '@storybook/addon-actions';
import CardContact from './CardContactComponent';

// Define actions for Storybook to track user interactions with the component
const handleDelete = action('Delete');
const handleToggleFavorite = action('Toggle Favorite');

// Export the Storybook metadata for the CardContact component
export default {
  title: 'Components/CardContact', // Storybook sidebar title
  component: CardContact, // Component being documented
};

// Create a template function to render the component with given args
const Template = (args) => <CardContact {...args} />;

// Default story for the CardContact component
export const Default = Template.bind({});
Default.args = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  imgUrl: 'https://robohash.org/johndoe.png',
  favorite: false, // Prop to indicate if the contact is a favorite
  onDelete: handleDelete, // Handler for delete action
  onToggleFavorite: handleToggleFavorite, // Handler for favorite toggle action
  styleFavorite: false, // Controls styling based on favorite status
};

// Favorite story demonstrating the component in a different state
export const Favorite = Template.bind({});
Favorite.args = {
  name: 'Jane Doe',
  email: 'jane.doe@example.com',
  imgUrl: 'https://robohash.org/janedoe.png',
  favorite: true, // Prop to indicate if the contact is a favorite
  onDelete: handleDelete,
  onToggleFavorite: handleToggleFavorite,
  styleFavorite: true, // Styling adjusted for favorite status
};
