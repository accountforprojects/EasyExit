const express = require("express");
const connectDB=require("./configure/db.js");
const cors = require("cors"); // Allows frontend to communicate with backend
const app = express();

app.use(cors()); // Enable CORS for localhost frontend
app.use(express.json()); // Middleware to parse JSON requests
connectDB();

app.post("/user/post", (req, res) => {
  console.log("Received Data:", req.body);
  res.json({ message: "User registered successfully!", user: req.body });
});

app.listen(8000, () => console.log("Server running on http://localhost:8000"));
