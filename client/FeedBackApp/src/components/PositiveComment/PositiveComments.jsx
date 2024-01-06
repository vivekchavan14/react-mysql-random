import React, { useState, useEffect } from 'react';

const PositiveComments = ({ postId }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/positive-comments/?post_id=${postId}`)
      .then((response) => response.json())
      .then((data) => setComments(data))
      .catch((error) => console.error('Error fetching positive comments:', error));
  }, [postId]);

  const handleDelete = (commentId) => {
    fetch(`http://localhost:5000/delete-comment/${commentId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          setComments((prevComments) => prevComments.filter((comment) => comment.comment_id !== commentId));
        } else {
          console.error('Failed to delete comment');
        }
      })
      .catch((error) => console.error('Error deleting comment:', error));
  };

  return (
    <div>
      <h1>Positive Comments for Post ID: {postId}</h1>
      <ul>
        {comments.map((comment) => (
          <li key={comment.comment_id}>
            <p>{comment.comment_text}</p>
            <p>User: {comment.user}</p>
            <button onClick={() => handleDelete(comment.comment_id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PositiveComments;
