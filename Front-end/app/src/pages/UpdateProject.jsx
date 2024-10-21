import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateProject = () => {
    const { project_id } = useParams(); 
    const navigate = useNavigate(); 
    const [project, setProject] = useState({
      project_title: "",
      short_description: "",
      image: "",
    });
    const [loading, setLoading] = useState(true);  // Ensure loading is managed
    const [error, setError] = useState("");
    const [newImage, setNewImage] = useState(null); // For handling new image uploads
  
    // Fetch the existing project data when the component mounts
    useEffect(() => {
      const fetchProject = async () => {
        try {
          const response = await axios.get(`http://localhost:8000/projects/${project_id}/details/`);
          console.log("Fetched Project Data: ", response.data); // Log response
          setProject(response.data);  // Set the project state with fetched data
        } catch (err) {
          console.error(err);
          setError("Error fetching project details.");
        } finally {
          setLoading(false);  // Loading ends after fetching data
        }
      };
  
      fetchProject();
    }, [project_id]);
  
    // Handle input changes
    const handleChange = (e) => {
      const { name, value } = e.target;
      setProject({ ...project, [name]: value });
    };
  
    // Handle image file selection
    const handleImageChange = (e) => {
      setNewImage(e.target.files[0]); // Get the selected file
    };
  
    // Handle form submission
    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      setError("");
  
      const formData = new FormData();
      formData.append("project_title", project.project_title);
      formData.append("short_description", project.short_description);
      formData.append("image", newImage ? newImage : project.image); // Keep existing image if no new one uploaded
  
      console.log("Form Data: ", Object.fromEntries(formData)); // Log form data
  
      try {
        const response = await axios.put(`http://localhost:8000/projects/${project_id}/project_update/`, formData, {
          headers: {
            "Content-Type": "multipart/form-data", // Important for file uploads
          },
        });
        console.log("Response from update: ", response.data); // Log the update response
        navigate(`/user-projects/`); // Redirect to user projects page
      } catch (err) {
        console.error(err);
        setError("Error updating project.");
      } finally {
        setLoading(false);
      }
    };
  
    // Conditionally render the form when loading is complete
    if (loading) {
      return <p>Loading project details...</p>;
    }
  
    if (error) {
      return <p className="text-danger">{error}</p>;
    }
  
    return (
      <div className="container mt-5">
        <h2 className="text-center mb-5">Update Project</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="project_title" className="form-label">Project Title</label>
            <input
              type="text"
              className="form-control"
              id="project_title"
              name="project_title"
              value={project.project_title || ''} // Pre-fills with existing title
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="short_description" className="form-label">Short Description</label>
            <textarea
              className="form-control"
              id="short_description"
              name="short_description"
              value={project.short_description || ''} // Pre-fills with existing description
              onChange={handleChange}
              required
            />
          </div>
      
          <div className="mb-3">
            <label htmlFor="new_image" className="form-label">Upload New Image (optional)</label>
            <input
              type="file"
              className="form-control"
              id="new_image"
              name="new_image"
              accept="image/*"
              onChange={handleImageChange} // Handle new image upload
            />
          </div>
          <button type="submit" className="bg-gray-700 no-underline text-white p-2 rounded-md hover:bg-gray-800">
            Update Project
          </button>
          <br /> <br /> <br /> <br />
        </form>
        {error && <p className="text-danger">{error}</p>}
      </div>
    );
  };
  

export default UpdateProject;
