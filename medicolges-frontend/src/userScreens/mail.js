import React, { useState } from 'react';
import axios from 'axios';

const VerifyEmail = () => {
  const [token, setToken] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/user/verify-email', { token });
      console.log(response.data.message);
      // Redirect user to login page or dashboard after verification
    } catch (error) {
      console.error('Error verifying email', error.response.data);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Token:
        <input type="text" value={token} onChange={e => setToken(e.target.value)} required />
      </label>
      <button type="submit">Verify Email</button>
    </form>
  );
};

export default VerifyEmail;
