import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for redirecting
import Button from '../components/Button'; // Your custom Button component
import axiosInstance from '../api/api'; // Import the Axios instance

const Signin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate(); // Hook to navigate programmatically

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await axiosInstance.post('/signin', {
        email: formData.email,
        password: formData.password,
      });

      // If the login is successful, display the success message or perform a redirect
      setSuccess('Login successful! Redirecting...');
      setTimeout(() => navigate('/signin/dashboard'), 2000); // Redirect after success (modify route as needed)

      console.log('Login successful:', response.data); // Optionally log the response data
    } catch (error) {
      console.error('Login error:', error.response?.data || error);
      setError(error.response?.data?.message || 'Login failed, please check your credentials.');
    }
  };

  return (
    <div className="p-10 flex justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-red-600 mb-6 text-center">Log In</h2>
        {/* Display Error or Success Messages */}
        {error && <p className="text-red-600 text-center mt-4">{error}</p>}
          {success && <p className="text-green-600 text-center mt-4">{success}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
              required
            />
          </div>

          <Button text="Log In" className="w-full bg-red-600 hover:bg-red-700" />

          
        </form>

        {/* Link for request-password-reset */}
        <p className="text-center mt-4">
          <Link to="/request-password-reset" className="text-red-600 hover:underline">
            Forgot Password?
          </Link>
        </p>

        {/* Link to Signup Page */}
        <p className="text-center mt-4">
          Don&apos;t have an account?{' '}
          <Link to="/signup" className="text-red-600 hover:underline">
            Sign Up here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signin;
