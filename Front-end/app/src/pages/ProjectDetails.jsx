import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProjectDetails = () => {
  const { projectId } = useParams(); // Get projectId from URL
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState(''); // State for new comment
  const [editComment, setEditComment] = useState(null); // State for editing comments
  const [updatedComment, setUpdatedComment] = useState(''); // State for updated comment

  // Simulated logged-in user
  const currentUser = {
    id: 1,  // Replace with actual user ID
    username: 'test_user',  // Replace with actual username
  };

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

  // Handle new comment submission
  const handleCommentSubmit = async (e, detailId) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://127.0.0.1:8000/projects/${projectId}/comments/`, {
        comment_text: newComment,
        detail_id: detailId // Assuming you need the detail ID for the backend
      });
      const updatedProject = { ...project };
      const detailIndex = updatedProject.project_details_with_comments.findIndex(detail => detail.detail.id === detailId);
      updatedProject.project_details_with_comments[detailIndex].comments.push(response.data);
      setProject(updatedProject);
      setNewComment(''); // Clear the comment field
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  // Handle comment update
  const handleUpdateSubmit = async (commentId, detailId) => {
    try {
      const response = await axios.put(`http://127.0.0.1:8000/comments/${commentId}/`, {
        comment_text: updatedComment
      });
      const updatedProject = { ...project };
      const detailIndex = updatedProject.project_details_with_comments.findIndex(detail => detail.detail.id === detailId);
      const commentIndex = updatedProject.project_details_with_comments[detailIndex].comments.findIndex(comment => comment.id === commentId);
      updatedProject.project_details_with_comments[detailIndex].comments[commentIndex] = response.data;
      setProject(updatedProject);
      setEditComment(null); // Exit edit mode
    } catch (error) {
      console.error('Error updating comment:', error);
    }
  };

  // Handle comment deletion
  const handleDeleteComment = async (commentId, detailId) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/comments/${commentId}/`);
      const updatedProject = { ...project };
      const detailIndex = updatedProject.project_details_with_comments.findIndex(detail => detail.detail.id === detailId);
      updatedProject.project_details_with_comments[detailIndex].comments = updatedProject.project_details_with_comments[detailIndex].comments.filter(comment => comment.id !== commentId);
      setProject(updatedProject);
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

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
            <p><strong>Description:</strong> {detail.description}</p>
            <p><strong>Benefit:</strong> {detail.benefit}</p>
            <br /><br />
            
            {/* Comments Section */}
            <h4>Comments:</h4>
            {comments && comments.length > 0 ? (
              comments.map((comment, commentIndex) => (
                <div key={commentIndex}>
                  {editComment === comment.id ? (
                    <div>
                      <textarea
                        value={updatedComment}
                        onChange={(e) => setUpdatedComment(e.target.value)}
                      />
                      <button onClick={() => handleUpdateSubmit(comment.id, detail.id)}>
                        Update Comment
                      </button>
                      <button onClick={() => setEditComment(null)}>Cancel</button>
                    </div>
                  ) : (
                    <p>
                      <strong>{comment.user.username}:</strong> <br />
                      {comment.comment_text} <br />
                      {comment.created_at}
                    </p>
                  )}

                  {/* Check if the logged-in user owns the comment */}
                  {comment.user.id === currentUser.id && (
                    <div>
                      <button onClick={() => setEditComment(comment.id)}>Edit</button>
                      <button onClick={() => handleDeleteComment(comment.id, detail.id)}>Delete</button>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p>No comments yet.</p>
            )}
            
            {/* New Comment Form */}
            <form onSubmit={(e) => handleCommentSubmit(e, detail.id)}>
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                required
              />
              <button type="submit">Submit Comment</button>
            </form>
            <br />
          </div>
        );
      })}
    </div>
  );
};

export default ProjectDetails;
