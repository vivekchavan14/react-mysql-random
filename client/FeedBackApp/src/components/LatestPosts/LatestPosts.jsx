import React, { useState, useEffect } from 'react';
import './LatestPosts.css'

const LatestPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/latest-posts')
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error('Error fetching latest posts:', error));
  }, []);

  return (
    <div>
      <h1 style={{ textAlign: 'center'}}>FeedBack Application</h1>
      <br/>
      <h1>Latest Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.post_id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <p>User: {post.user}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LatestPosts;
