// App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Navigate, Routes } from 'react-router-dom';
import Login from './components/Login';
import Logout from './components/Logout';
import CharacterList from './components/CharacterList';
import useTokenRefresh from './useTokenRefresh';

const App: React.FC = () => {
  const initialToken = localStorage.getItem('token');
  const token = useTokenRefresh(initialToken);

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

export default App;
