import React, { useState } from 'react';
import Pagination from './Pagination';

// Mock function for setPage
const mockSetPage = (newPage) => {
  console.log('Page set to:', newPage);
};

export default {
  title: 'Components/Pagination',
  component: Pagination,
};

const Template = (args) => {
  // Use local state to manage the current page within the story
  const [page, setPage] = useState(args.page);
  
  return <Pagination {...args} page={page} setPage={setPage} />;
};

export const Default = Template.bind({});
Default.args = {
  page: 1, // Start at the first page
  totalPages: 5, // Total number of pages
  setPage: mockSetPage, // Mock function for setPage
};

export const MiddlePage = Template.bind({});
MiddlePage.args = {
  page: 3, // Start at the third page
  totalPages: 5, // Total number of pages
  setPage: mockSetPage, // Mock function for setPage
};

export const LastPage = Template.bind({});
LastPage.args = {
  page: 5, // Start at the last page
  totalPages: 5, // Total number of pages
  setPage: mockSetPage, // Mock function for setPage
};
