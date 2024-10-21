import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateProjectDetails = () => {
    const [formData, setFormData] = useState({
        project: '',
        school_category: '',
        status: '',
        github_link: '',
        description: '',
        image_sample: null,
        benefit: '',
    });
    const [csrfToken, setCsrfToken] = useState('');
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    // Fetch CSRF token from Django
    useEffect(() => {
        const fetchCsrfToken = async () => {
            try {
                const response = await axios.get('http://localhost:8000/get-csrf-token/', { withCredentials: true });
                setCsrfToken(response.data.csrfToken);
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
            image_sample: e.target.files[0],
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
        formDataToSend.append('image_sample', formData.image_sample);
        formDataToSend.append('benefit', formData.benefit);

        try {
            const response = await axios.post('http://localhost:8000/project_details_create/', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'X-CSRFToken': csrfToken,
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                withCredentials: true,
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
            console.error('Error submitting form:', error);
            setError('Failed to create project details. Please try again.');
        }
    };

    return (
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
                  <label className="sr-only" htmlFor="project">Project</label>
                  <div className="relative">
                      <input
                          id="project"
                          name="project"
                          type="text"
                          placeholder="Enter project name"
                          value={formData.project}
                          onChange={handleChange}
                          required
                          className="w-full rounded-lg border-gray-300 p-4 pe-12 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                      />
                  </div>
              </div>
  
              <div>
                  <label className="sr-only" htmlFor="school_category">School Category</label>
                  <div className="relative">
                      <input
                          id="school_category"
                          name="school_category"
                          type="text"
                          placeholder="Enter school category"
                          value={formData.school_category}
                          onChange={handleChange}
                          required
                          className="w-full rounded-lg border-gray-300 p-4 pe-12 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                      />
                  </div>
              </div>
  
              <div>
                  <label className="sr-only" htmlFor="status">Status</label>
                  <div className="relative">
                      <input
                          id="status"
                          name="status"
                          type="text"
                          placeholder="Enter project status"
                          value={formData.status}
                          onChange={handleChange}
                          required
                          className="w-full rounded-lg border-gray-300 p-4 pe-12 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                      />
                  </div>
              </div>
  
              <div>
                  <label className="sr-only" htmlFor="github_link">GitHub Link</label>
                  <div className="relative">
                      <input
                          id="github_link"
                          name="github_link"
                          type="url"
                          placeholder="Enter GitHub link"
                          value={formData.github_link}
                          onChange={handleChange}
                          className="w-full rounded-lg border-gray-300 p-4 pe-12 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                      />
                  </div>
              </div>
  
              <div>
                  <label className="sr-only" htmlFor="description">Description</label>
                  <div className="relative">
                      <textarea
                          id="description"
                          name="description"
                          placeholder="Enter project description"
                          value={formData.description}
                          onChange={handleChange}
                          className="w-full rounded-lg border-gray-300 p-4 pe-12 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                      />
                  </div>
              </div>
  
              <div>
                  <label className="sr-only" htmlFor="image_sample">Image Sample</label>
                  <div className="relative">
                      <input
                          id="image_sample"
                          name="image_sample"
                          type="file"
                          onChange={handleFileChange}
                          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                      />
                  </div>
              </div>
  
              <div>
                  <label className="sr-only" htmlFor="benefit">Benefit</label>
                  <div className="relative">
                      <input
                          id="benefit"
                          name="benefit"
                          type="text"
                          placeholder="Enter project benefit"
                          value={formData.benefit}
                          onChange={handleChange}
                          required
                          className="w-full rounded-lg border-gray-300 p-4 pe-12 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                      />
                  </div>
              </div>
  
              <button
                  type="submit"
                  className="inline-block rounded-lg bg-gray-700 px-5 py-3 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                  Submit
              </button>
          </form>
      </div>
  );
  
  
};

export default CreateProjectDetails;
