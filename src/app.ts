import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import path from "path";
import { allRoutes } from "./routes/routes";

const app = express();
const port = process.env.PORT;

// Set Pug as the view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// Middleware
app.use(express.json());

// Use routes
app.use("/api", allRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
