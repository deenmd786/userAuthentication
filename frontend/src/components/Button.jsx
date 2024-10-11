// Button.jsx
import PropTypes from 'prop-types'; // Import PropTypes for validation

const Button = ({ text, onClick, className }) => {
  return (
    <button
      className={`px-4 py-2 rounded-md text-white shadow-sm shadow-slate-100 bg-red-600 hover:bg-red-700 transition-all ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

// Define prop types for validation
Button.propTypes = {
  text: PropTypes.string.isRequired, // Ensure 'text' is a string and required
  onClick: PropTypes.func,           // Ensure 'onClick' is a function
  className: PropTypes.string,       // Ensure 'className' is a string (optional)
};

// Default props (optional if needed)
Button.defaultProps = {
  className: '',                     // Default className is an empty string
  onClick: () => {},                 // Default onClick is an empty function
};

export default Button;
