import { useEffect, useState } from 'react';
import fetchData from '../api/apiService';
import { useDispatch } from 'react-redux';
import { addContact, setTotalPages } from '../redux/reducers/contactReducer';

const useFetch = () => {
  const [loading, setLoading] = useState(true); // State to manage loading status
  const [error, setError] = useState(null); // State to manage errors
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      setLoading(true); // Set loading to true when fetching data
     
      let page = 1; // Initialize page number
      let totalPagesResult = 1; // Initialize total pages

      while (page <= totalPagesResult) {
        const result = await fetchData(`/users?page=${page}`); // Fetch data from API
        if (result.total_pages) {
          totalPagesResult = result.total_pages; // Update total pages based on API response
        }
        
        // Add a 'favorite' property to each contact
        const contactsWithFavorites = result.data.map(contact => ({
          ...contact,
          favorite: false,
        }));
        
        page++; // Increment page number for next fetch
        dispatch(addContact(contactsWithFavorites)); // Dispatch action to add contacts to the Redux store
      }

      dispatch(setTotalPages(totalPagesResult)); // Dispatch action to set total pages in the Redux store
    } catch (error) {
      setError(error); // Set error if fetching fails
    } finally {
      setLoading(false); // Set loading to false after fetching is done
    }
  };

  useEffect(() => {
    getData(); // Call getData on component mount
  }, [dispatch]); // Only re-run the effect if dispatch changes

  return { loading, error }; // Return loading and error states
};

export default useFetch;
