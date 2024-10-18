import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../AuthContext/AuthContext';
import { Link, useNavigate } from 'react-router-dom'; 

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();


  // Function to get CSRF token from cookies
  const getCSRFToken = () => {
    const cookieValue = document.cookie
      .split('; ')
      .find(row => row.startsWith('csrftoken'))
      ?.split('=')[1];
    return cookieValue;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    login();  // Set the user as authenticated
    const csrfToken = getCSRFToken();  // Get the CSRF token

    try {
      await axios.post("http://localhost:8000/login/", {
        username,
        password,
      }, {
        headers: {
          'X-CSRFToken': csrfToken,  // Send CSRF token in the request headers
        },
        withCredentials: true,  // Ensure cookies are sent with the request
      });

      
      
      navigate("/dashboard");  // Redirect to the dashboard after login
    } catch (error) {
      setErrorMessage('Invalid credentials. Please try again.');
    }
  };

  return (
    <>
    <div class="mx-auto px-4 py-16 sm:px-6 lg:px-8 max-w-lg text-center h-[100vh]">
    <h1 class="text-2xl font-bold sm:text-3xl">Login</h1>
      <form class="mx-auto mb-0 mt-8 max-w-md space-y-4" onSubmit={handleLogin}>
        <div>
        <label class="sr-only" for="username">Username</label>
          <div class="relative">
              <input
                placeholder="Enter your username"
                class="w-full rounded-lg border-gray-300 p-4 pe-12 text-sm shadow-sm"
                id="username"
                type="text"
                name='username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
        </div>
        <div>
        <label class="sr-only" for="password">Password</label>
          <div class="relative">
              <input
                placeholder="Enter your password"
                class="w-full rounded-lg border-gray-300 p-4 pe-12 text-sm shadow-sm"
                id="password"
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
        </div>
        
        <div class="flex items-center justify-between">
            <div className="flex flex-col">
              <p class="text-gray-600">Don't have an account?</p>
              <Link to="/signup" class="underline">Create One Here</Link>
            </div>
            <button class="inline-block rounded-lg bg-gray-700 px-5 py-3 text-sm font-medium text-white" type="submit">
              Sign In
            </button>
          </div>
      </form>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
    </>
  );
};

export default Login;
