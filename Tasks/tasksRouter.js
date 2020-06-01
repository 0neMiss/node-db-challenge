const express = require('express');


const db = require('../data/db-config.js');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const tasks = await db('tasks')
        .join('projects', {'projects.id': 'tasks.project_id'});
        console.log(tasks);
        // const projectInfo = await db('projects').select('name, description, id').where({id: task.project_id});
        res.status(200).json(tasks);
    } catch (err) {
        res.status(500).json({ message: 'Could not retrieve tasks', error: err});
    }
});

router.post('/', async (req, res) => {
    const taskData = req.body;
    console.log(req.body);
    try {
        const task = await db('tasks').insert(taskData);
        if (!taskData.description) {
            res.status(400).json({ message: 'Please Fill out a description.'})
        }
        else {
        res.status(201).json(task);}
        }
    catch (err) {
        res.status(500).json({ message: 'There was an error creating the task.', error: err});
    }
});

module.exports = router;
