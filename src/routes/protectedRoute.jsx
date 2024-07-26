// src/components/ProtectedRoute.jsx
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../auth/authContext';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { user } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) =>
        user ? (
          <Component {...props} />
        ) : (
          <Redirect to='/HRLogin' />
        )
      }
    />
  );
};

export default ProtectedRoute;
