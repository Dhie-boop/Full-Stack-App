import axios from "axios";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api/', // your API base URL
  timeout: 5000, // optional timeout for the request
  headers: {
    'Content-Type': 'application/json',
  },
});

// A flag to prevent multiple token refresh requests
let refresh = false;

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // If the request is successful, simply return the response
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Check if the error is a 401 Unauthorized and the token refresh is not already in process
    if (error.response.status === 401 && !refresh) {
      refresh = true;
      try {
        // Fetch the refresh token from local storage
        const refreshToken = localStorage.getItem('refresh_token');

        if (refreshToken) {
          // Make a request to refresh the access token
          const response = await axios.post('http://localhost:8000/token/refresh/', {
            refresh: refreshToken,
          });

          if (response.status === 200) {
            // Save the new access and refresh tokens in local storage
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);

            // Update the authorization header for future requests
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
            originalRequest.headers['Authorization'] = `Bearer ${response.data.access}`;

            // Retry the original request with the new token
            return axiosInstance(originalRequest);
          }
        }
      } catch (err) {
        // If token refresh fails, perform a logout
        handleLogout();
      }
    }
    refresh = false;
    return Promise.reject(error);
  }
);

// Logout function that clears local storage and redirects the user to the login page
const handleLogout = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  window.location.href = '/login'; // Redirect to login page
};

export default axiosInstance;
