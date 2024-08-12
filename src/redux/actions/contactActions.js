// Action creator for adding a new contact
export const addContact = (contact) => ({
    type: "ADD_CONTACT",
    payload: contact, // The contact object to be added to the state
});

// Action creator for deleting a contact by its ID
export const deleteContact = (id) => ({
    type: "DELETE_CONTACT",
    payload: id, // The ID of the contact to be deleted
});

// Action creator for toggling the favorite status of a contact by its ID
export const toggleFavorite = (id) => ({
    type: "TOGGLE_FAVORITE",
    payload: id, // The ID of the contact whose favorite status needs to be toggled
});

// Action creator for setting the total number of pages
export const totalPages = (page) => ({
    type: "TOTAL_PAGE",
    payload: page, // The total number of pages to be set in the state
});
