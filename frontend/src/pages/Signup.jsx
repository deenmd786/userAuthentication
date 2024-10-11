import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Use useNavigate for redirection
import Button from '../components/Button'; // Your custom Button component
import axiosInstance from '../api/api'; // Axios instance

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState(''); // For error messages
  const [success, setSuccess] = useState(''); // For success messages
  const navigate = useNavigate(); // For programmatic navigation after signup

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Clear previous error messages
    setError('');
    setSuccess('');

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      // POST request to the backend API for signup
      const response = await axiosInstance.post('/signup', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      setSuccess(response.data.message || 'Signup successful!'); // Show success message from response or default message
      // Redirect to the login page after signup
      setTimeout(() => navigate('/signin'), 2000);
      
    } catch (error) {
      console.error('Signup error:', error.response?.data || error);
      setError(error.response?.data?.message || 'Signup failed, please try again.');
    }
  };

  return (
    <div className="p-10 flex justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-red-600 mb-6 text-center">Sign Up</h2>

        {/* Display error or success messages */}
        {error && <p className="text-red-600 text-center mb-4">{error}</p>}
        {success && <p className="text-green-600 text-center mb-4">{success}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
              required
            />
          </div>

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

          <div className="mb-4">
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

          <div className="mb-6">
            <label className="block text-gray-700">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
              required
            />
          </div>

          <Button text="Sign Up" className="w-full bg-red-600 hover:bg-red-700" />
        </form>

        {/* Link to Sign In Page */}
        <p className="text-center mt-4">
          Already have an account?{' '}
          <Link to="/signin" className="text-red-600 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
