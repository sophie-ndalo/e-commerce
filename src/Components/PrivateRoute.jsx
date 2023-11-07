import React from 'react';
import { Route, Navigate } from 'react-router-dom';

// Custom PrivateRoute component to protect routes
function PrivateRoute({ element, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      element={authenticated ? element : <Navigate to="/login" />}
    />
  );
}

export default PrivateRoute;
