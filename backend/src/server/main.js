import express from "express";
import ViteExpress from "vite-express";
import cors from "cors";
import { getTasks, createTask } from "./dbService.js";

const app = express();


app.use(cors()); // Enable CORS to allow requests from the frontend. This is necessary because the frontend and backend are running on different ports during development.
app.use(express.json()); // Middleware to parse JSON bodies in incoming requests. This allows us to access the data sent from the frontend in the request body.
app.get("/hello", (req, res) => {
  res.send("Hello Vite!");
});

app.get("/tasks", async (req, res) => {
  const tasks = await getTasks();
  res.json(tasks);
});

app.post("/tasks", async (req, res) => {
  const { task } = req.body;
  const newTask = await createTask(task);
  res.json(newTask);
});


ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000..."),
);
