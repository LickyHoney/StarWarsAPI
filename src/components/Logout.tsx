// Import necessary dependencies and styles
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.css';

// Define Logout functional component
const Logout: React.FC = () => {
  // Initialize navigate hook to handle redirection
  const history = useNavigate();

  // Function to handle logout process
  const handleLogout = () => {
    localStorage.removeItem('token');
    history('/login');
  };

  // Render logout button
  return (
    <div>
      {/* <h2>Logout</h2>
      <p>Are you sure you want to logout?</p> */}
      {/* <div className="logout-button btn-primary"> */}
      <button type="button"  onClick={handleLogout}>
      Logout  <i className="fas fa-sign-out-alt"></i>
      </button>
      {/* </div> */}
    </div>
  );
};

// Export Logout component
export default Logout;
