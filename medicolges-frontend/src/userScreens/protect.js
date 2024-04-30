import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const userInfo = localStorage.getItem('userInfo');
  const user = userInfo ? JSON.parse(userInfo) : null;

  if (!user || !user.twoFactorEnabled) {
    // Redirect them to the QR setup page if not logged in or 2FA not enabled
    return <Navigate to="/qr" />;
  }

  return children;
};

export default ProtectedRoute; // Ensure this line is exactly like this
