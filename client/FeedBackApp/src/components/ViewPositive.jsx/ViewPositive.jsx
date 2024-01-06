// PositiveComments.js
import React, { useState, useEffect } from 'react';

const ViewPositive = () => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/positive-comments')
      .then((response) => response.json())
      .then((data) => setComments(data))
      .catch((error) => console.error('Error fetching positive comments:', error));
  }, []);

  return (
    <div>
      <h2>All Positive Comments with Post ID</h2>
      <ul>
        {comments.map((comment) => (
          <li key={comment.comment_id}>
            <p>Post ID: {comment.post_id}</p>
            <p>Comment: {comment.comment_text}</p>
            <p>User: {comment.user}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewPositive;
