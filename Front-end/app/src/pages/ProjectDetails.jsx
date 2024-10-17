import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProjectDetails = () => {
  const { projectId } = useParams();  // Get projectId from URL
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/projects/${projectId}/details/`);

        setProject(response.data);
      } catch (error) {
        console.error("Error fetching project details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectDetails();
  }, [projectId]);

  if (loading) {
    return <p>Loading project details...</p>;
  }

  if (!project) {
    return <p>Project not found</p>;
  }

  return (
    <div className="container mt-5">
      {/* Access project details */}
      <h2 className="text-center mb-5 font-bold">{project.project.project_title}</h2>
      
      {/* Display project image */}
      <img
        src={`http://localhost:8000${project.project.image}`}  // Adjusted to use correct image path
        className="img-fluid"
        alt={project.project.project_title}
      /> 
      <br /><br />
  
      {/* Loop through project details */}
      {project.project_details_with_comments.map((detailItem, index) => {
        const detail = detailItem.detail;  // Accessing project details
        const comments = detailItem.comments;  // Accessing project comments
        
        return (
          <div key={index} className="mt-4">
            {/* School Category, Status, Benefit, GitHub Link */}
            <p><strong>School:</strong> {detail.school_category}</p>
            <p><strong>Status:</strong> {detail.status}</p>
            <p><strong>Github:</strong> <a href={detail.github_link}>{detail.github_link}</a></p>
            {/* Description */}
            <p><strong>Description:</strong> {detail.description}</p>
            

            <p><strong>Benefit:</strong> {detail.benefit}</p>
            <br /><br />
            
            {/* Comments Section */}
            <h4>Comments:</h4>
            {comments && comments.length > 0 ? (
              comments.map((comment, commentIndex) => (
                <p key={commentIndex}><strong>{comment.user}:</strong> <br></br> {comment.comment_text} <br></br> {comment.created_at}</p>
              ))
            ) : (
              <p>No comments yet.</p>
            )}
            <br />
          </div>
        );
      })}
    </div>
  );
  
  
};

export default ProjectDetails;
