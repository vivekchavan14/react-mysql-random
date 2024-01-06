import React from 'react';
import PositiveComments from './PositiveComment/PositiveComments.jsx';
import DeleteComment from './DeleteComment/DeleteComment.jsx';

const Post = ({ title, content, user, post_id }) => {
  

  const commentIdToDelete = 1;

  return (
    <div>
      <h3>{title}</h3>
      <p>{content}</p>
      <p>User: {user}</p>
      <PositiveComments postId={post_id} />
      <DeleteComment commentId={commentIdToDelete} />
    </div>
  );
};

export default Post;
