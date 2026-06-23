import express from "express";
import ViteExpress from "vite-express";
import cors from "cors";
import { getTasks, createTask, getTask, updateTask, deleteTask } from "./dbService.js";
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { getLeaseholders, createLeaseholder, getTenants, createTenant, getPerformanceByTenant, createPerformance } from './performanceService.js';


const app = express();

const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: { title: 'ToDo API', version: '1.0.0' },
  },
  apis: ['./src/server/main.js'],
});
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


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

app.get('/leaseholders', async (req, res) => {
  const leaseholders = await getLeaseholders();
  res.json(leaseholders);
});

app.post('/leaseholders', async (req, res) => {
  const { name, email, phone } = req.body;
  const leaseholder = await createLeaseholder(name, email, phone);
  res.json(leaseholder);
});

app.get('/tenants', async (req, res) => {
  const tenants = await getTenants();
  res.json(tenants);
});

app.post('/tenants', async (req, res) => {
  const { name, email, phone, currentLeaseholderId } = req.body;
  const tenant = await createTenant(name, email, phone, currentLeaseholderId);
  res.json(tenant);
});

app.get('/performance/:tenantId', async (req, res) => {
  const { tenantId } = req.params;
  const performance = await getPerformanceByTenant(tenantId);
  res.json(performance);
});

app.post('/performance', async (req, res) => {
  const performance = await createPerformance(req.body);
  res.json(performance);
});

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000..."),
);
