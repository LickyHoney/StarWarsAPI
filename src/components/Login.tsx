// Login.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../AuthService';
import "bootstrap/dist/css/bootstrap.min.css"
import "../App.css"

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useNavigate();
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleLogin = async () => {
    try {
      // Validate username
      if (username !== 'demo') {
        setUsernameError('Username must be "demo"');
        return;
      } else {
        setUsernameError('');
      }
      if (password !== 'password') {
        setPasswordError('Password must be "password"');
        return;
      } else {
        setPasswordError('');
      }

      const response = await login(username, password);
      localStorage.setItem('token', response.token);
      history('/starwars');
    } catch (error: any) {
      console.error('Login failed', error);
    
    }
  };

  return (
    <div>
    <div className="header">
      <h2>Star Wars Characters</h2>
      </div>
    <div className="Auth-form-container">
      
      <form className="Auth-form">
      <div className="Auth-form-content">
      <h3 className="Auth-form-title">Sign In</h3>
      <div className="form-group mt-3">
        <label style={{ display: 'inline-block', marginRight: '10px' }}>
          Username: 
          <input className="form-control mt-1" type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
        </label>
        {usernameError && <div className="error-message">{usernameError}</div>} {/* Display error message */}

        </div>
        {/* <br /> */}
        <div className="form-group mt-3">
        <label>
          Password:
          <input className="form-control mt-1" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        {passwordError && <div className="error-message">{passwordError}</div>} {/* Display error message */}

        </div>
        {/* <br /> */}
        <div className="d-grid gap-2 mt-3">
        <button type="button" onClick={handleLogin}>
          Login
        </button>
        </div>
        </div>
      </form>
    </div>
    </div>
  );
};

 export default Login;
