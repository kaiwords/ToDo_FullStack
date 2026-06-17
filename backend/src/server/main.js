import express from "express";
import ViteExpress from "vite-express";
import cors from "cors";
import { getTasks, createTask, getTask, updateTask, deleteTask } from "./dbService.js";

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
  console.log(req.body);
  const { task } = req.body;
  const newTask = await createTask(task);
  res.json(newTask);
});

app.put("/tasks", async (req, res) => {
  console.log(req.body);
  const { task, id } = req.body;
  const existingTask = await getTask(id);
  if (!existingTask) {
    return res.status(404).json({error: "Task not found"});
  }
  const updatedTask = await updateTask(id, task);
  res.json(updatedTask);
});

app.delete("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  const existingTask = await getTask(parseInt(id));
  if (!existingTask) {
    return res.status(404).json({error: "Task not found"});
  }
  await deleteTask(parseInt(id));
  res.json({message: "Task deleted successfully"})
});

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000..."),
);
