const express = require('express');
const app = express();

// Middleware for parsing JSON request bodies
app.use(express.json());

// API endpoint for creating a meeting
app.post('/api/create-meeting', (req, res) => {
  // Extract meeting information from the request body
  const { title, description, startTime, endTime } = req.body;

  // Add logic to interact with your database and create a meeting

  // Send a response back to the client
  res.status(201).json({ message: 'Meeting created successfully', meeting: { title, description, startTime, endTime } });
});

// API endpoint for user login
app.post('/api/login', (req, res) => {
  // Extract login information from the request body
  const { username, password } = req.body;

  // Add logic to interact with your database and authenticate the user

  // Send a response back to the client
  res.status(200).json({ message: 'Login successful', user: { username } });
});

// Serve static files from the public folder
app.use(express.static('public'));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
