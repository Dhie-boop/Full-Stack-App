import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProjectDetails = () => {
  const { projectId } = useParams(); 
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState('');
  const [editComment, setEditComment] = useState(null); 
  const [updatedComment, setUpdatedComment] = useState(''); 

  const currentUser = { id: 1, username: 'test_user' };

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/user-projects/${projectId}/`);
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

  const handleCommentSubmit = async (e, detailId) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:8000/projects/${projectId}/comments/`, {
        comment_text: newComment,
        detail_id: detailId
      });
      // Update project state here...
      setNewComment('');
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  const handleUpdateSubmit = async (commentId, detailId) => {
    try {
      const response = await axios.put(`http://127.0.0.1:8000/comments/${commentId}/`, {
        comment_text: updatedComment
      });
      // Update project state here...
      setEditComment(null);
    } catch (error) {
      console.error('Error updating comment:', error);
    }
  };

  const handleDeleteComment = async (commentId, detailId) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/comments/${commentId}/`);
      // Update project state here...
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-5 font-bold">{project.project.project_title}</h2>
      <img src={`http://localhost:8000${project.project.image}`} className="img-fluid" alt={project.project.project_title} /> 
      <br /><br />
      {project.project_details_with_comments.map((detailItem, index) => {
        const detail = detailItem.detail;  
        const comments = detailItem.comments;  
        
        return (
          <div key={index} className="mt-4">
            <p><strong>School:</strong> {detail.school_category}</p>
            <p><strong>Status:</strong> {detail.status}</p>
            <p><strong>Github:</strong> <a href={detail.github_link}>{detail.github_link}</a></p>
            <p><strong>Description:</strong> {detail.description}</p>
            <p><strong>Benefit:</strong> {detail.benefit}</p>
            <br /><br />
            
            <h4>Comments:</h4>
            {comments.length > 0 ? (
              comments.map((comment, commentIndex) => (
                <div key={commentIndex}>
                  {editComment === comment.id ? (
                    <div>
                      <textarea value={updatedComment} onChange={(e) => setUpdatedComment(e.target.value)} />
                      <button onClick={() => handleUpdateSubmit(comment.id, detail.id)}>Update Comment</button>
                      <button onClick={() => setEditComment(null)}>Cancel</button>
                    </div>
                  ) : (
                    <p>
                      <strong>{comment.user.username}:</strong> <br />
                      {comment.comment_text} <br />
                      {comment.created_at}
                    </p>
                  )}

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
            
            <form onSubmit={(e) => handleCommentSubmit(e, detail.id)}>
              <textarea value={newComment} onChange={(e) => setNewComment(e.target.value)} placeholder="Add a comment..." required />
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
