import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchProjects(); // Fetch projects based on search and category
  };

  const fetchProjects = async () => {
    setLoading(true);
    try {
      // Add 'withCredentials' to include session cookies in the request
      const response = await axios.get("http://localhost:8000/projects/", {
        params: {
          search: searchTerm,
          category: category,
        },
        withCredentials: true,  // This will allow sending the session cookie
      });

      setProjects(response.data.projects);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects(); // Fetch projects on initial load
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-5 font-bold">Published Projects</h2>

      {/* Search Bar */}
      <form className="flex justify-center mb-8" onSubmit={handleSearch}>
        <div className="flex space-x-4">
          <select
            className="p-2 border border-gray-300 rounded-md"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            <option value="Science & Technology">School of Science & Technology</option>
            <option value="Business">School of Business</option>
            <option value="Education">School of Education</option>
            <option value="Health Sciences">School of Health Sciences</option>
            <option value="Natural Sciences">School of Natural Sciences</option>
            <option value="Social Sciences">School of Social Sciences</option>
            <option value="Theology & Religious Studies">School of Theology & Religious Studies</option>
            <option value="Agriculture">School of Agriculture & Applied Sciences</option>
          </select>

          <input
            type="text"
            className="p-2 border border-gray-300 rounded-md"
            placeholder="Search projects"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <button
            type="submit"
            className="bg-gray-700 text-white p-2 rounded-md hover:bg-gray-800"
          >
            Search
          </button>
        </div>
      </form>

      {/* Loading Indicator */}
      {loading && <p>Loading projects...</p>}

      {/* Project Cards */}
      <div className="row">
        {!loading && projects.length === 0 && (
          <p className="text-center">Ooops..... I think the project your looking for might have not been published. Could you please use another key word to search. Thank you my Boss.</p>
        )}

        {!loading && projects.map((project) => (
          <div key={project.id} className="col-md-4">
            <div className="card mb-4 shadow-sm">
            {console.log(project)}
            <img
              src={`http://localhost:8000/project_images/project_images/${project.image}`}  // Adjusted to use correct image path
              className="img-fluid"
              alt={project.project_title}
            /> 
              <div className="card-body">
                <h5 className="card-title">{project.project_title}</h5>
                <p className="card-text">{project.short_description}</p>
                {project.project_details && project.project_details.map((detail, index) => (
                  <div key={index}>
                    <p><strong>School:</strong> {detail.school_category}</p>
                    <p><strong>Status:</strong> {detail.status}</p>
                    <p><strong>Github:</strong> <a href={detail.github_link}>{detail.github_link}</a></p>
                    <p><strong>Description:</strong> {detail.description}</p>
                  </div>
                ))}
                <Link
                  to={`/projects/${project.id}/details`}
                  className="bg-gray-700 no-underline text-white p-2 rounded-md hover:bg-gray-800"
                > 
                  View Project
                </Link>
              </div>
            </div>
          </div>
        ))}
         <br />  <br />  <br /> <br />
      </div>
    </div>
    
  );
 
};

export default Projects;
