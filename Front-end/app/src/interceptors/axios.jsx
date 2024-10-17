import axios from 'axios';

// Helper to get CSRF token from the cookie
const getCsrfToken = () => {
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === 'csrftoken') {
      return value;
    }
  }
  return null;
};

const csrfToken = getCsrfToken();

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000/',
  headers: {
    'X-CSRFToken': csrfToken,  // Add the CSRF token to every request
    'Content-Type': 'application/json',
  },
  withCredentials: true,  // Important: ensures cookies (session) are sent with requests
});

export default axiosInstance;
