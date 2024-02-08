// App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Navigate, Routes } from 'react-router-dom';
import Login from './components/Login';
import Logout from './components/Logout';
import CharacterList from './components/CharacterList';
import useTokenRefresh from './useTokenRefresh';

// Define the main App component
const App: React.FC = () => {
  // Get the initial token from localStorage
  const initialToken = localStorage.getItem('token');

  // Use the useTokenRefresh hook to manage token refresh
  const token = useTokenRefresh(initialToken);

  // Render the App component
  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<Login/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/logout" element={<Logout/>} />
        {/* {token ? ( */}
          <Route path="/starwars" element={token ? <CharacterList /> : <Navigate to="/login"/> } />
        {/* // ) : (
        //   <Route path="/login" />
        // )} */}
        <Route path="/login" />
      </Routes>
    </Router>
  );
};

// Export the App component
export default App;
