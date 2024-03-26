import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import { toast } from 'react-toastify'; // Import toast

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Change to false initially
  const { dispatch } = useAuthContext();
  
  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:5000/api/v1/user/auth', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ email, password }),
      });
      const json = await response.json();

      if (!response.ok) {
        setIsLoading(false);
        setError(json.message || json.error);
        if (json.blocked) {
          // If the user is blocked, display a specific message
          toast.error("This account has been blocked. Please contact support.");
        } else {
          // Display other errors as toast as well
          toast.error(json.message || json.error);
        }
      } else {
        // Proceed with login if not blocked
        localStorage.setItem('user', JSON.stringify(json));
        dispatch({type: 'LOGIN', payload: json});
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      setError("This account has been blocked. Please contact support  .");
      // Display fetch errors as toast
      toast.error("This account has been blocked. Please contact support :(");
    }
  };

  return { login, isLoading, error };
};
