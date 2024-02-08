// Logout.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.css';

const Logout: React.FC = () => {
  const history = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    history('/login');
  };

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

export default Logout;
