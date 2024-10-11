import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Button from '../components/Button'; // Your custom Button component
import axiosInstance from '../api/api'; // Your axios instance for API calls

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [errMessage, setErrMessage] = useState('');
  const [token, setToken] = useState('');

  // Extract token from the URL query parameters
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const tokenFromUrl = queryParams.get('token');
    if (tokenFromUrl) {
      setToken(tokenFromUrl); // Set the token in state
    }
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setErrMessage('Passwords do not match.');
    } else {
      try {
        console.log("Token from URL: ", token);
        // Send the token and new password to the backend API
        const response = await axiosInstance.post('/reset-password', {
          token,
          newPassword,
        });

        // Assuming successful response
        setMessage(response?.data?.message || 'Your password has been reset successfully.');
        setNewPassword('');
        setConfirmPassword('');
      } catch (error) {
        console.error('Password reset error:', error);
        setErrMessage(error.response?.data?.message || 'There was an error resetting your password. Please try again.');
      }
    }
  };

  return (
    <div className="pt-10 flex justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-red-600 mb-6 text-center">Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Confirm New Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
              required
            />
          </div>

          <Button text="Reset Password" className="w-full bg-red-600 hover:bg-red-700" />
        </form>

        {/* Display message after submission */}
        {message && <p className="mt-4 text-center text-green-600">{message}</p>}
        {errMessage && <p className="mt-4 text-center text-red-600">{message}</p>}
      </div>
    </div>
  );
};

export default ResetPassword;
