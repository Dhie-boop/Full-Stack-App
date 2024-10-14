import React, { useState } from "react";
import { Link } from "react-router-dom";

const Projects = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    // Add logic to handle the search based on searchTerm and category
    console.log("Searching for:", searchTerm, "in category:", category);
  };

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
            <option value="web">Web Development</option>
            <option value="mobile">Mobile Development</option>
            <option value="data">Data Science</option>
            <option value="design">UI/UX Design</option>
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

      {/* Project Cards */}
      <div className="row">
        {/* Example project cards */}
        <div className="col-md-4">
          <div className="card mb-4 shadow-sm">
            <img
              src="https://via.placeholder.com/150"
              className="card-img-top"
              alt="Project 1"
            />
            <div className="card-body">
              <h5 className="card-title">Project 1</h5>
              <p className="card-text">Short description of Project 1.</p>
              <Link
                href="#"
                className="bg-gray-700 no-underline text-white p-2 rounded-md hover:bg-gray-800 "
              >
                View Project
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card mb-4 shadow-sm">
            <img
              src="https://via.placeholder.com/150"
              className="card-img-top"
              alt="Project 2"
            />
            <div className="card-body">
              <h5 className="card-title">Project 2</h5>
              <p className="card-text">Short description of Project 2.</p>
              <Link
                href="#"
                className="bg-gray-700 no-underline text-white p-2 rounded-md hover:bg-gray-800 "
              >
                View Project
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card mb-4 shadow-sm">
            <img
              src="https://via.placeholder.com/150"
              className="card-img-top"
              alt="Project 3"
            />
            <div className="card-body">
              <h5 className="card-title">Project 3</h5>
              <p className="card-text">Short description of Project 3.</p>
              <Link
                href="#"
                className="bg-gray-700 no-underline text-white p-2 rounded-md hover:bg-gray-800 "
              >
                View Project
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
