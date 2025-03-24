import express from "express";
import {connectDB} from "./configure/db.js";
import cors from "cors"; // Allows frontend to communicate with backend
import userRoute from "./Routes/userRoute.js";
import passroute from "./Routes/passroute.js";
import adminRoute from "./Routes/adminRoute.js";

const app = express();

app.use(cors()); // Enable CORS for localhost frontend
app.use(express.json()); // Middleware to parse JSON requests

connectDB();

app.use("/user", userRoute);
app.use("/passes",passroute);
app.use("/admin",adminRoute);
app.get("/", (req, res) => {
  res.send("API Working");
});

app.listen(8000, () => console.log("Server running on http://localhost:8000"));
