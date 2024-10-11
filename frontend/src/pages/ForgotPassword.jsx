import { useState } from 'react';
import Button from '../components/Button'; // Your custom Button component
import axiosInstance from '../api/api'; // Axios instance for API calls

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(''); // Clear message state before submitting
    setError(''); // Clear error state

    try {
      // Make an API call to the backend to trigger password reset
      const response = await axiosInstance.post('/request-password-reset', { email });

      // If successful, show success message
      setMessage(response?.data?.message || 'If an account exists with that email, a password reset link will be sent.');      setEmail(''); // Clear email input field
    } catch (err) {
      // Handle errors here
      console.error('Error sending reset email:', err.response?.data || err);
      setError(err.response?.data?.message || 'Error sending reset email. Please try again later.');
    }
  };

  return (
    <div className="pt-10 flex justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-red-600 mb-6 text-center">Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
              required
            />
          </div>

          <Button text="Send Reset Link" className="w-full bg-red-600 hover:bg-red-700" />

          {/* Display error or success messages */}
          {error && <p className="mt-4 text-red-600 text-center">{error}</p>}
          {message && <p className="mt-4 text-green-600 text-center">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
