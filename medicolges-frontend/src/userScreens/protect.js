import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, roleRequired }) => {
  const userInfo = localStorage.getItem('userInfo');
  const user = userInfo ? JSON.parse(userInfo) : null;

  // Redirect to login if not logged in
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Redirect to QR setup if 2FA is not enabled
  if (!user.twoFactorEnabled) {
    return <Navigate to="/qr" />;
  }

  // Check if the required role matches the user's role (if a specific role is required)
  if (roleRequired && user.role !== roleRequired) {
    // Redirect to the default page if the role doesn't match
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
