
import React from 'react';

const DeleteComment = ({ commentId, onDelete }) => {
  const handleDelete = () => {
    fetch(`http://localhost:5000/delete-comment/${commentId}`, {
      method: 'POST',
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Comment deleted:', data);
        onDelete(); 
      })
      .catch((error) => console.error('Error deleting comment:', error));
  };

  return (
    <button onClick={handleDelete}>Delete Comment</button>
  );
};

export default DeleteComment;
