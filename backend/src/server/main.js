import express from "express";
import ViteExpress from "vite-express";
import cors from "cors";
import { getTasks } from "./dbService.js";

const app = express();


app.use(cors()); // Enable CORS to allow requests from the frontend. This is necessary because the frontend and backend are running on different ports during development.

app.get("/hello", (req, res) => {
  res.send("Hello Vite!");
});

app.get("/tasks", async (req, res) => {
  const tasks = await getTasks();
  res.json(tasks);
});

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000..."),
);
