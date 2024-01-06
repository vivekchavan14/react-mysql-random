const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
const port = 5000;

const connection = mysql.createConnection(
    {
        host: '127.0.0.1',
        user: 'root',
        password : '',
        database : 'feedbackapp',
       
    }
)


connection.connect(function(err) {
    if (err) {
      console.error('Error connecting to database:', err.stack);
      return;
    }
    console.log('Connected to database as id', connection.threadId);
  });
  
app.get('/',(req,res)=>{
    res.send('Hello')
})

app.use(express.json());
app.use(cors());

app.get('/latest-posts', (req, res) => {
    const query = `
      SELECT p.post_id, p.title, p.content, u.username AS user
      FROM posts p
      INNER JOIN users u ON p.user_id = u.user_id
      ORDER BY p.created_at DESC
      LIMIT 3;
    `;
    connection.query(query, (err, results) => {
      if (err) {
        console.error('Error retrieving latest posts:', err);
        res.status(500).json({ error: 'Error retrieving latest posts' });
        return;
      }
      res.json(results);
    });
  });

  app.post('/new-post', (req, res) => {
    
    const { title, content, user_id = 0, rating } = req.body;
    const query = `
      INSERT INTO posts (title, content, user_id, created_at, rating)
      VALUES (?, ?, ?, NOW(), ?);
    `;
    connection.query(query, [title, content, user_id, rating], (err, result) => {
      if (err) {
        console.error('Error inserting new post:', err);
        res.status(500).json({ error: 'Error inserting new post' });
        return;
      }
      res.json({ message: 'New post added successfully', postId: result.insertId });
    });
  });


  app.get('/positive-comments', (req, res) => {
    const { post_id } = req.query;
  
    if (!post_id) {
      return res.status(400).json({ error: 'post_id parameter is missing' });
    }
  
    const query = `
    SELECT c.comment_id, c.comment_text, u.username AS user
    FROM comments AS c
    INNER JOIN users AS u ON c.user_id = u.user_id
    INNER JOIN posts AS p ON c.post_id = p.post_id
    WHERE (c.post_id = ? AND p.rating > 3);
    
    `;
  
    connection.query(query, [post_id], (err, results) => {
      if (err) {
        console.error('Error retrieving positive comments:', err);
        return res.status(500).json({ error: 'Error retrieving positive comments' });
      }
      return res.json(results);
    });
  });
  

  app.delete('/delete-comment/:comment_id', (req, res) => {
    const { comment_id } = req.params;
    const query = `
      DELETE FROM comments
      WHERE comment_id = ?;
    `;
    connection.query(query, [comment_id], (err, result) => {
      if (err) {
        console.error('Error deleting comment:', err);
        res.status(500).json({ error: 'Error deleting comment' });
        return;
      }
      res.json({ message: 'Comment deleted successfully' });
    });
  });


  
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})