import { createSlice } from '@reduxjs/toolkit';

// Initial state of the contacts slice
const initialState = {
  contacts: [], // Array to store contact objects
  totalPages: 0, // Total number of pages for all contacts
  totalPagesFavorite: 1, // Total number of pages for favorite contacts
};

// Create a slice of the Redux store
const contactSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    // Reducer to add new contacts to the state
    addContact: (state, action) => {
      // Ensure payload is an array
      const newContacts = Array.isArray(action.payload) ? action.payload : [action.payload];
      
      // Add each contact if it does not already exist
      newContacts.forEach(newContact => {
        const exists = state.contacts.some(contact => contact.id === newContact.id);
        if (!exists) {
          state.contacts.push(newContact);
        }
      });
    },

    // Reducer to toggle the favorite status of a contact
    toggleFavorite: (state, action) => {
      const id = action.payload; // Get the ID from the action payload
      const contact = state.contacts.find(c => c.id === id); // Find the contact with the given ID
      if (contact) {
        contact.favorite = !contact.favorite; // Toggle the favorite status
      }
    },

    // Reducer to delete a contact by its ID
    deleteContact: (state, action) => {
      const id = action.payload; // Get the ID from the action payload
      // Remove contact from the array if it matches the given ID
      state.contacts = state.contacts.filter(c => c.id !== id);
    },

    // Reducer to set the total number of pages for all contacts
    setTotalPages: (state, action) => {
      state.totalPages = action.payload; // Set the total pages from the action payload
    },

    // Reducer to calculate the total number of pages for all contacts
    calculateTotalPages: (state) => {
      const cant = state.contacts.length; // Get the number of contacts
      // Calculate total pages based on a page size of 8
      const cantPage = Math.ceil(cant / 8);
      state.totalPages = cantPage > 0 ? cantPage : 1; // Ensure at least one page
    },

    // Reducer to calculate the total number of pages for favorite contacts
    calculateTotalPagesFavorites: (state) => {
      // Filter favorite contacts and calculate pages
      const cantFavorite = state.contacts.filter(fav => fav.favorite).length;
      const cantPageFavorite = Math.ceil(cantFavorite / 8);
      state.totalPagesFavorite = cantPageFavorite > 0 ? cantPageFavorite : 1; // Ensure at least one page
    }
  },
});

// Export actions for use in components
export const {
  addContact,
  toggleFavorite,
  deleteContact,
  setTotalPages,
  calculateTotalPagesFavorites,
  calculateTotalPages
} = contactSlice.actions;

// Export reducer to be used in the store
export default contactSlice.reducer;
