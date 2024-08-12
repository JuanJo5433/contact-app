import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { describe, it, expect, vi } from 'vitest';
import FormComponent from './FormComponent';
import contactReducer from '../redux/reducers/contactReducer';

// Mock for dispatch function
const mockDispatch = vi.fn();

// Create a mock store with contactReducer
const store = configureStore({
  reducer: {
    contacts: contactReducer,
  },
});

// Override the store's dispatch method with the mock
store.dispatch = mockDispatch;

describe('FormComponent', () => {
  // Clear all mock call information before each test
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render form fields and submit the form', async () => {
    render(
      <Provider store={store}>
        <FormComponent />
      </Provider>
    );

    // Check that form fields are present
    expect(screen.getByPlaceholderText('First Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Last Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();

    // Fill out the form
    fireEvent.change(screen.getByPlaceholderText('First Name'), {
      target: { value: 'John' },
    });
    fireEvent.change(screen.getByPlaceholderText('Last Name'), {
      target: { value: 'Doe' },
    });
    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'john.doe@example.com' },
    });
    fireEvent.click(screen.getByLabelText('Enable like favorite'));

    // Submit the form
    fireEvent.click(screen.getByText('Save'));

    await waitFor(() => {
      // Verify that dispatch was called
      expect(mockDispatch).toHaveBeenCalled();
      const callArgs = mockDispatch.mock.calls[0][0];
      // Check that the dispatched action contains the correct data
      expect(callArgs).toEqual(expect.objectContaining({
        type: 'contacts/addContact',
        payload: expect.objectContaining({
          first_name: 'John',
          last_name: 'Doe',
          email: 'john.doe@example.com',
          favorite: true,
          id: expect.any(String), // ID generation
          avatar: `https://robohash.org/JohnDoe.png`, // Avatar URL generation
        }),
      }));
    });
  });

  it('should handle error on form submission', async () => {
    // Simulate an error during dispatch
    mockDispatch.mockImplementation(() => {
      throw new Error('Failed to add contact');
    });

    render(
      <Provider store={store}>
        <FormComponent />
      </Provider>
    );

    // Fill out the form
    fireEvent.change(screen.getByPlaceholderText('First Name'), {
      target: { value: 'John' },
    });
    fireEvent.change(screen.getByPlaceholderText('Last Name'), {
      target: { value: 'Doe' },
    });
    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'john.doe@example.com' },
    });

    // Submit the form
    fireEvent.click(screen.getByText('Save'));

    await waitFor(() => {
      // Verify that the error message is displayed
      expect(screen.queryByText('Failed to add contact. Please try again.')).toBeInTheDocument();
    });
  });
});
