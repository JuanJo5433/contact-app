import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import NavBar from './NavBarComponent';

// Story configuration for the NavBar component
export default {
  title: 'Components/NavBar',
  component: NavBar,
  decorators: [
    (Story) => (
      // MemoryRouter is used to simulate the router context
      <MemoryRouter initialEntries={['/']}>
        <Story />
      </MemoryRouter>
    ),
  ],
};

// Base template to create variations of the NavBar component
const Template = (args) => <NavBar {...args} />;

// Default story of the NavBar
export const Default = Template.bind({});
Default.args = {
  toggleForm: () => {}, // Placeholder for the form toggle function
  formOpen: false, // Initial state of the form (closed)
};

// Story of the NavBar with the form open
export const FormOpen = Template.bind({});
FormOpen.args = {
  toggleForm: () => {}, // Placeholder for the form toggle function
  formOpen: true, // Initial state of the form (open)
};
