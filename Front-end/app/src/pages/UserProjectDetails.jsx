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
      <img
        src={`http://localhost:8000${project.project.image}`}
        className="img-fluid rounded-lg shadow-md mb-4"
        alt={project.project.project_title}
      />
  
      {project.project_details_with_comments.map((detailItem, index) => {
        const detail = detailItem.detail;  
        const comments = detailItem.comments;  
  
        return (
          <div key={index} className="mt-4 p-4 border border-gray-300 rounded-lg shadow-md">
            <p><strong>School:</strong> {detail.school_category}</p>
            <p><strong>Status:</strong> {detail.status}</p>
            <p><strong>Github:</strong> <a href={detail.github_link} className="text-blue-500 hover:underline">{detail.github_link}</a></p>
            <p><strong>Description:</strong> {detail.description}</p>
            <p><strong>Benefit:</strong> {detail.benefit}</p>
  
            <h4 className="mt-4 font-semibold">Comments:</h4>
            {comments.length > 0 ? (
              comments.map((comment, commentIndex) => (
                <div key={commentIndex} className="border-b border-gray-200 py-2">
                  {editComment === comment.id ? (
                    <div className="flex flex-col space-y-2">
                      <textarea
                        value={updatedComment}
                        onChange={(e) => setUpdatedComment(e.target.value)}
                        className="p-2 border border-gray-300 rounded-md"
                        placeholder="Update your comment..."
                      />
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleUpdateSubmit(comment.id, detail.id)}
                          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                        >
                          Update Comment
                        </button>
                        <button
                          onClick={() => setEditComment(null)}
                          className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="py-2">
                      <p className="font-semibold">
                        {comment.user.username}:
                      </p>
                      <p className="ml-4">{comment.comment_text}</p>
                      <p className="text-gray-500 text-sm">{comment.created_at}</p>
  
                      {comment.user.id === currentUser.id && (
                        <div className="flex space-x-2 mt-2">
                          <button
                            onClick={() => setEditComment(comment.id)}
                            className="bg-yellow-500 text-white px-4 py-1 rounded-md hover:bg-yellow-600"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteComment(comment.id, detail.id)}
                            className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-500">No comments yet.</p>
            )}
  
            <form onSubmit={(e) => handleCommentSubmit(e, detail.id)} className="mt-4">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                required
                className="p-2 border border-gray-300 rounded-md w-full"
              />
              <button
                type="submit"
                className="mt-2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
              >
                Submit Comment
              </button>
            </form>
          </div>
        );
      })}
    </div>
  );
  
};

export default ProjectDetails;
