import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home'; 
import About from '../pages/About'; 
import Contact from '../pages/Contact'; 
import Services from '../pages/Services'; 
import Header from '../components/Header';
import Signup from '../pages/Signup';
import Signin from '../pages/Signin';
import Dashboard from '../pages/Dashboard';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword'; // Import the ResetPassword component

const AppRouter = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Services />} />
        <Route path="/signup" element={<Signup />} />  {/* Signup route */}
        <Route path="/signin" element={<Signin />} />    {/* Login route */}
        <Route path="/signin/dashboard" element={<Dashboard />} />    {/* Login route */}
        <Route path="/request-password-reset" element={<ForgotPassword />} /> {/* Forgot Password route */}
        <Route path="/request-password-reset/reset-password" element={<ResetPassword />} /> {/* Reset Password route */}
      </Routes>
    </Router>
  );
};

export default AppRouter;
