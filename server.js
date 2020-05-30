const express = require('express');
const projectRouter = require("./Projects/projectsRouter.js");
const resourcesRouter = require("./Resources/resourcesRouter.js");
const tasksRouter = require("./Tasks/tasksRouter.js");
const server = express();

server.use(express.json());
server.use("/api/projects", projectRouter);
server.use("/api/resources", resourcesRouter);
server.use("/api/tasks", tasksRouter);

module.exports = server;
