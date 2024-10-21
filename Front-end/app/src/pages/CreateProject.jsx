import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const CreateProject = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [formData, setFormData] = useState({
    project_title: '',
    short_description: '',
    image: null,  // For image uploads
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Handle form input change (for text fields)
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle image file selection
  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],  // Store the selected file
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData object to handle file and text data
    const formDataToSend = new FormData();
    formDataToSend.append('project_title', formData.project_title);
    formDataToSend.append('short_description', formData.short_description);
    formDataToSend.append('image', formData.image);  // Append the image file

    try {
      // Make POST request with FormData
      const response = await axios.post('http://localhost:8000/projects/project_create/', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',  // Required for file uploads
        },
      });

      if (response.status === 201) {
        setSuccess('Project created successfully!');
        setError('');

        // Redirect to the createdetails page
        navigate('/createdetails'); // Use navigate to redirect
      }
    } catch (error) {
      setError('Error creating project. Please try again.');
      setSuccess('');
      console.error('There was an error creating the project:', error);
    }
  };

  return (
    <>
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg text-center">
          <h1 className="text-2xl font-bold sm:text-3xl">Create New Project</h1>
          <p className="mt-4 text-gray-600">
            Fill in the details below to create a new project.
          </p>
        </div>

        <form className="mx-auto mb-0 mt-8 max-w-md space-y-4" onSubmit={handleSubmit} encType="multipart/form-data">
          <div>
            {success && <p className="text-green-500">{success}</p>}
            {error && <p className="text-red-500">{error}</p>}
          </div>

          <div>
            <label className="sr-only" htmlFor="project_title">Project Title</label>
            <div className="relative">
              <input
                placeholder="Enter project title"
                className="w-full rounded-lg border-gray-300 p-4 pe-12 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                id="project_title"
                name="project_title"
                type="text"
                value={formData.project_title}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div>
            <label className="sr-only" htmlFor="short_description">Short Description</label>
            <div className="relative">
              <textarea
                placeholder="Enter short description"
                className="w-full rounded-lg border-gray-300 p-4 pe-12 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                id="short_description"
                name="short_description"
                value={formData.short_description}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div>
            <label className="sr-only" htmlFor="image">Upload Image</label>
            <div className="relative">
              <input
                className="w-full rounded-lg border-gray-300 p-4 pe-12 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                id="image"
                name="image"
                type="file"
                onChange={handleFileChange}
                accept="image/*"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <button
              className="inline-block rounded-lg bg-gray-700 px-5 py-3 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              type="submit"
            >
              Create Project
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateProject;
