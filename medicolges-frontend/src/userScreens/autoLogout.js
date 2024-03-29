import React, { useEffect, useContext } from 'react';
import { useNavigate ,useLocation } from 'react-router-dom';
import { AuthContext } from './AuthContext'; // Adjust the import path as necessary

const TIMEOUT = 180000; // 3 minutes


const AutoLogout = () => {
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation(); // Use useLocation to get the current path
  useEffect(() => {
    let logoutTimer;
    
    const logout = () => {
      // Clear the authentication token
      const userInfo = localStorage.getItem('userInfo');
if (userInfo && location.pathname !== '/login') {
    localStorage.removeItem('userInfo');
    console.log('User disconnected due to idle timeout');

    // Dispatch LOGOUT action
    dispatch({ type: 'LOGOUT' });

    // Redirect to the login page using navigate
    navigate('/login');
      console.log('Auto-logout skipped due to not being logged in or already on login page.');
      return; // Skip setting up the auto-logout if not logged in or already on the login page
    }

     
    };

    const resetTimer = () => {
      clearTimeout(logoutTimer);
      logoutTimer = setTimeout(logout, TIMEOUT);
    };

    // Add event listeners for user activity
    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keypress', resetTimer);

    // Set the initial timer
    resetTimer();

    // Cleanup on component unmount
    return () => {
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keypress', resetTimer);
      clearTimeout(logoutTimer);
    };
  }, [navigate, dispatch]); // Include dispatch in the dependencies array

  return null; // This component doesn't render anything
};

export default AutoLogout;
