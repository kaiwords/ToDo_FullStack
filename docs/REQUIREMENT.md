ToDo
________________________
## BRD
Business wants its staff to keep list of ToDo, so that business can see the list of tasks the starrs are working on.

## PRD
Store the title of the tasks you work on. Allow to add new, update existing and delete tasks

## Task
- title

## Milestones
Milestone 1 - ToDo App Frontend
> Setup the  Project git repository
> Install and setup react application using vite
  --- Configure routing
  --- Add react hook form
  --- Add yup
> As a user I shoud be able to List all tasks
> As a user I should be able to add new task and see it as soon as I add it
> As a user I should be able to edit existing task
> As a user I should be able to delete existing task

Milestone 2 - ToDo App Backend
> Install and setup express.js using vite
 --- Prisma (connect to database)
>Create database schema
 --- Task
> Create API endpoints
--- List all task 
--- Add new task
--- Update existing task
--- Delete existing task
> Configure swagger to list all the API endpoints
> Configure postman collection

Milestone 3 - Integration between Frontend and Backend
> As a user I should be able to get tasks from backend
>As a user when I update existing task it should persist
> As a user when I delete existing tasks it should be permanently deleted
> As a user I should be able to add new task that store to the database

Milestone 4 - Deployment of the App
> Create pipeline to build and deploy task to AWS
> Create infra to host frontend in S3
> Create infra to host backend EC2

Milestone 5 - Write E2E test to test the features