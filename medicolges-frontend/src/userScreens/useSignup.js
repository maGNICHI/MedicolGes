import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import { toast } from "react-toastify";
export const useSignup = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext() 
  
  const signup = async ( gender,username,firstName,lastName, email, password, role,certification) => {
    setIsLoading(true)
    setError(null)
    console.log(JSON.stringify({ gender, username, firstName, lastName, email, password, role ,certification}));
  
    const response = await fetch('http://localhost:5000/api/user', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ gender, username,firstName,lastName, email, password, role,certification})
    })
    const json = await response.json()

    if (!response.ok) {
      setIsLoading(false)
      const errorData = await response.json();
      console.error('Error:', errorData);
      toast.error('Failed to sign up. ' + (errorData.message || ''));
      setError(json.error)
    }
    if (response.ok) {
      // save the user to local storage
      localStorage.setItem('userInfo', JSON.stringify(json))

      // update the auth context
      dispatch({type: 'LOGIN', payload: json})

      // update loading state
      setIsLoading(false)
    }
  }

  return { signup, isLoading, error }
}