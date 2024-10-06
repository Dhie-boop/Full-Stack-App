import React from 'react';

const Projects = () => {
  return (
    <div className="container mt-5">
      <h2 className="text-center">Published Projects</h2>
      <div className="row">
        {/* Example project cards */}
        <div className="col-md-4">
          <div className="card mb-4 shadow-sm">
            <img src="https://via.placeholder.com/150" className="card-img-top" alt="Project 1" />
            <div className="card-body">
              <h5 className="card-title">Project 1</h5>
              <p className="card-text">Short description of Project 1. You can provide a brief summary here.</p>
              <a href="#" className="btn btn-primary">View Project</a>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card mb-4 shadow-sm">
            <img src="https://via.placeholder.com/150" className="card-img-top" alt="Project 2" />
            <div className="card-body">
              <h5 className="card-title">Project 2</h5>
              <p className="card-text">Short description of Project 2.</p>
              <a href="#" className="btn btn-primary">View Project</a>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card mb-4 shadow-sm">
            <img src="https://via.placeholder.com/150" className="card-img-top" alt="Project 3" />
            <div className="card-body">
              <h5 className="card-title">Project 3</h5>
              <p className="card-text">Short description of Project 3.</p>
              <a href="#" className="btn btn-primary">View Project</a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Projects;
