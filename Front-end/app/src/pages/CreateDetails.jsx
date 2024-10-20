import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateProjectDetails = () => {
    const [formData, setFormData] = useState({
        project: '',
        school_category: '',
        status: '',
        github_link: '',
        description: '',
        image_sample: null,  // For image uploads
        benefit: '',
    });
    const [csrfToken, setCsrfToken] = useState(''); // State to store CSRF token
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    // Fetch CSRF token from Django
    useEffect(() => {
        const fetchCsrfToken = async () => {
            try {
                const response = await axios.get('http://localhost:8000/get-csrf-token/', { withCredentials: true });
                setCsrfToken(response.data.csrfToken);
                console.log("CSRF Token fetched:", response.data.csrfToken);  // Log the CSRF token
            } catch (error) {
                console.error('Error fetching CSRF token:', error);
            }
        };
        fetchCsrfToken();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            image_sample: e.target.files[0],  // Capture the uploaded image
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccess('');
        setError('');

        const formDataToSend = new FormData();
        formDataToSend.append('project', formData.project);
        formDataToSend.append('school_category', formData.school_category);
        formDataToSend.append('status', formData.status);
        formDataToSend.append('github_link', formData.github_link);
        formDataToSend.append('description', formData.description);
        formDataToSend.append('image_sample', formData.image_sample);  // Append the image file
        formDataToSend.append('benefit', formData.benefit);

        try {
            const response = await axios.post('http://localhost:8000/project_details_create/', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'X-CSRFToken': csrfToken,  // Pass the CSRF token
                    'Authorization': `Bearer ${localStorage.getItem('token')}`  // Include authorization if needed
                },
                withCredentials: true,  // Required for session authentication to send cookies
            });

            setSuccess('Project details created successfully!');
            setFormData({
                project: '',
                school_category: '',
                status: '',
                github_link: '',
                description: '',
                image_sample: null,
                benefit: '',
            });
        } catch (error) {
            console.error('Axios error:', error.response ? error.response.data : error.message);
            setError('Failed to create project details. Please try again.');
        }
    };

  return (
    <>
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg text-center">
          <h1 className="text-2xl font-bold sm:text-3xl">Create New Project Details</h1>
          <p className="mt-4 text-gray-600">
            Fill in the details below to create a new project.
          </p>
        </div>

        <form className="mx-auto mb-0 mt-8 max-w-md space-y-4" onSubmit={handleSubmit} encType="multipart/form-data">
          <div>
            {success && <p className="text-green-500">{success}</p>}
            {error && <p className="text-red-500">{error}</p>}
          </div>

          {/* Project */}
          <div>
            <label className="sr-only" htmlFor="project">Project</label>
            <div className="relative">
              <input
                placeholder="Enter project"
                className="w-full rounded-lg border-gray-300 p-4 pe-12 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                id="project"
                name="project"
                type="text"
                value={formData.project}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* School Category */}
          <div>
            <label className="sr-only" htmlFor="school_category">School Category</label>
            <div className="relative">
              <input
                placeholder="Enter school category"
                className="w-full rounded-lg border-gray-300 p-4 pe-12 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                id="school_category"
                name="school_category"
                type="text"
                value={formData.school_category}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="sr-only" htmlFor="status">Status</label>
            <div className="relative">
              <input
                placeholder="Enter status"
                className="w-full rounded-lg border-gray-300 p-4 pe-12 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                id="status"
                name="status"
                type="text"
                value={formData.status}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* GitHub Link */}
          <div>
            <label className="sr-only" htmlFor="github_link">GitHub Link</label>
            <div className="relative">
              <input
                placeholder="Enter GitHub link"
                className="w-full rounded-lg border-gray-300 p-4 pe-12 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                id="github_link"
                name="github_link"
                type="url"
                value={formData.github_link}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="sr-only" htmlFor="description">Description</label>
            <div className="relative">
              <textarea
                placeholder="Enter description"
                className="w-full rounded-lg border-gray-300 p-4 pe-12 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Image Sample */}
          <div>
            <label className="sr-only" htmlFor="image_sample">Upload Image Sample</label>
            <div className="relative">
              <input
                className="w-full rounded-lg border-gray-300 p-4 pe-12 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                id="image_sample"
                name="image_sample"
                type="file"
                onChange={handleFileChange}
                accept="image/*"
              />
            </div>
          </div>

          {/* Benefit */}
          <div>
            <label className="sr-only" htmlFor="benefit">Benefit</label>
            <div className="relative">
              <textarea
                placeholder="Enter benefit"
                className="w-full rounded-lg border-gray-300 p-4 pe-12 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                id="benefit"
                name="benefit"
                value={formData.benefit}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Submit Button */}
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

export default CreateProjectDetails;
