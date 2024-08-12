const API_URL = 'https://reqres.in/api';

const fetchData = async (endpoint = '/users?page=2') => {
  try {
    // Construct the full URL by appending the endpoint to the base API URL
    const response = await fetch(`${API_URL}${endpoint}`);
    
    // Check if the response status is not in the 2xx range, indicating an error
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    // Convert the response to JSON format
    const data = await response.json();
   
    return data;
  } catch (error) {
    // Handle and log errors related to fetching or parsing data
    console.error('Error fetching data:', error);
    throw error; // Rethrow error to allow further handling by the caller
  }
};

export default fetchData;
