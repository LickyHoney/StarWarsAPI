// authService.ts
import axios from 'axios';

// Define the base URL for the API
const API_URL = 'http://localhost:3000';

// Define the shape of the authentication response
interface AuthResponse {
    token: string;
    username: string;
  }

// Function to handle user login
export const login = async (username: string, password: string): Promise<{ token: string; username: string }> => {

// Simulate a delay to mimic the network request
await new Promise((resolve) => setTimeout(resolve, 1000));

// Check if the provided username and password are valid (use a simple mock for demonstration)
if (username === 'demo' && password === 'password') {
  // If valid, return a mock token
  //return 'mocked-jwt-token';
  return { token: 'mocked-jwt-token', username: 'demo' };
} else {
  // If invalid, throw an error (you can customize error handling based on your needs)
  throw new Error('Invalid username or password');
}
};

// Function to handle token refresh
export const refreshToken = async (refreshToken: string): Promise<string> => {

// Simulate a delay to mimic the network request
await new Promise((resolve) => setTimeout(resolve, 1000));

// For mock, simply return a new mock token
return 'refreshed-mocked-jwt-token';
};

