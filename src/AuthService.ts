// authService.ts
import axios from 'axios';

const API_URL = 'http://localhost:3000';

interface AuthResponse {
    token: string;
    username: string;
  }

export const login = async (username: string, password: string): Promise<{ token: string; username: string }> => {
//const response = await axios.post<AuthResponse>(`${API_URL}/login`, { username, password });
//console.log(response);
//   return response.data.token;
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


export const refreshToken = async (refreshToken: string): Promise<string> => {
//   const response = await axios.post<AuthResponse>(`${API_URL}/refresh-token`, { refreshToken });
//   return response.data.token;
// Simulate a delay to mimic the network request
await new Promise((resolve) => setTimeout(resolve, 1000));

// For mock, simply return a new mock token
return 'refreshed-mocked-jwt-token';
};

// // authService.ts
// import axios, {AxiosError} from 'axios';

// const API_URL = 'http://localhost:3000';

// interface AuthResponse {
//   token: string;
// }

// // export const login = async (username: string, password: string): Promise<string> => {
// //   try {
// //     debugger;
// //     const response = await axios.post<AuthResponse>(`${API_URL}/login`, { username, password });
// //     console.log(response);
// //     return response.data.token;
// //   } catch (error) {
// //     // Handle login error, e.g., show an error message or throw a specific error
// //     throw new Error('Login failed. Please check your credentials.');
// //   }
// // };

// export const login = async (username: string, password: string): Promise<string> => {
//     try {
//       console.log('Sending login request...', { username, password });
  
//       const response = await axios.post<AuthResponse>(`${API_URL}/login`, { username, password });
  
//       console.log('Login response:', response.data);
  
//       return response.data.token;
//     } catch (error) {
//       // Check if it's an AxiosError
//       if (axios.isAxiosError(error)) {
//         const axiosError = error as AxiosError;
  
//         // Check if the server responded with a status code
//         if (axiosError.response) {
//           console.error('Login failed. Server responded with:', axiosError.response.status, axiosError.response.data);
//           throw new Error('Login failed. Please check your credentials.');
//         } else if (axiosError.request) {
//           // The request was made but no response was received
//           console.error('Login request made, but no response received:', axiosError.request);
//         } else {
//           // Something went wrong in setting up the request
//           console.error('Error setting up login request:', axiosError.message);
//         }
//       } else {
//         // Not an AxiosError, log the generic error
//         console.error('Login failed. Error:', error);
//       }
  
//       throw new Error('Login failed. Please check your credentials.');
//     }
//   };
// export const refreshToken = async (refreshToken: string): Promise<string> => {
//   try {
//     const response = await axios.post<AuthResponse>(`${API_URL}/refresh-token`, { refreshToken });
//     return response.data.token;
//   } catch (error) {
//     // Handle refresh token error, similar to login
//     throw new Error('Token refresh failed. Please try again.');
//   }
// };
