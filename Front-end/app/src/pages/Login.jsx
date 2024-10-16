import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; // Updated import

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate(); // Updated to useNavigate

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:8000/token/', {
        username,
        password
      });

      const { access, refresh } = response.data;

      // Store tokens in localStorage (or any other secure storage)
      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);

      // Redirect the user to the dashboard (or another protected route)
      navigate('/dashboard'); // Updated to navigate
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
        <label class="sr-only" for="username">
              Username
            </label>
          <div class="relative">
              <input
                placeholder="Enter your username"
                class="w-full rounded-lg border-gray-300 p-4 pe-12 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
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
        <label class="sr-only" for="password">
              Password
            </label>
          <div class="relative">
              <input
                placeholder="Enter your password"
                class="w-full rounded-lg border-gray-300 p-4 pe-12 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                id="password"
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span class="absolute inset-y-0 end-0 grid place-content-center px-4">
                <svg
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  fill="none"
                  class="h-6 w-6 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    stroke-width="2"
                    stroke-linejoin="round"
                    stroke-linecap="round"
                  ></path>
                  <path
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    stroke-width="2"
                    stroke-linejoin="round"
                    stroke-linecap="round"
                  ></path>
                </svg>
              </span>
            </div>
        </div>
        
        <div class="flex items-center justify-between">
            <div className="flex flex-col">
              <p class="text-gray-600">Dont have an account?</p>
              <Link to="/signup" class="underline">
                Create One Here
              </Link>
            </div>
            <button
              class="inline-block rounded-lg bg-gray-700 px-5 py-3 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              type="submit"
            >
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
