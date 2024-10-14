import React, { useEffect, useState } from 'react';
import axiosInstance from '../interceptors/axios';  // Import the axios interceptor

const Home = () => {
    const [userData, setUserData] = useState(null);  // State to store user data
    const [loading, setLoading] = useState(true);    // Loading state for async call

    // useEffect hook to fetch data when the component mounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Making an API request to get user data (protected endpoint)
                const response = await axiosInstance.get('api/register/');
                setUserData(response.data);  // Store the user data in state
            } catch (error) {
                console.log('Error fetching user data:', error);
            } finally {
                setLoading(false);  // Set loading to false after the request completes
            }
        };

        fetchData();
    }, []);

    return (
        <div className="container mt-5">
            {loading ? (
                <h2>Loading...</h2>  // Show loading text while fetching data
            ) : (
                <div>
                    <h1>Welcome to MyApp</h1>
                    {userData ? (
                        <p>Welcome, {userData.username}!</p>  // Show username if authenticated
                    ) : (
                        <p>Please log in to access more features.</p>  // Prompt to log in
                    )}
                    <p>This is the Home page. Enjoy your stay!</p>
                </div>
            )}
        </div>
    );
};

export default Home;
