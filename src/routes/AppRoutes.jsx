import React from 'react';
import { Route, Routes } from 'react-router-dom';
import OverviewPage from '../pages/OverviewPage';
import FavoritesPage from '../pages/FavoritesPage';
import ContactsPage from '../pages/ContactsPage';

// Component that sets up the application's routing
const AppRoutes = ({ loading, error }) => {
  return (
    <Routes>
      {/* Route for the overview page */}
      <Route path="/" element={<OverviewPage loading={loading} error={error}/>} />
      {/* Route for the favorites page */}
      <Route path="/favorites" element={<FavoritesPage loading={loading} error={error}/>} />
      {/* Route for the contacts page */}
      <Route path="/contacts" element={<ContactsPage loading={loading} error={error}/>} />
      {/* Default route that redirects to the overview page */}
      <Route path="/*" element={<OverviewPage loading={loading} error={error}/>} />
    </Routes>
  );
};

export default AppRoutes;
