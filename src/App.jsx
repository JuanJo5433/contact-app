import { useState } from 'react';
import './App.css';
import NavBar from './components/NavBarComponent';
import FormComponent from './components/FormComponent';
import AppRoutes from './routes/AppRoutes';
import useFetch from './hooks/useFetch';

function App() {
  // Custom hook for fetching data, managing loading and error states
  const { loading, error } = useFetch();

  // Local state to manage the form visibility
  const [formOpen, setFormOpen] = useState(false);

  // Toggle the form visibility
  const toggleForm = () => {
    setFormOpen(!formOpen);
  };
  
  return (
    <>
      {/* Render the navigation bar and pass down props for form toggle and visibility */}
      <NavBar toggleForm={toggleForm} formOpen={formOpen}/>
      
      {/* Conditionally render the form component based on formOpen state */}
      {formOpen && <FormComponent />}
      
      {/* Render application routes and pass down loading and error states */}
      <AppRoutes loading={loading} error={error} />
    </>
  );
}

export default App;
