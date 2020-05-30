const express = require('express');


const db = require('../data/db-config.js');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const tasks = await db('tasks');
        res.status(200).json(tasks);
    } catch (err) {
        res.status(500).json({ message: 'Could not retrieve tasks', error: err});
    }
});

router.post('/', async (req, res) => {
    const taskData = req.body;
    console.log(req.body);

    try {
        if (!taskData.description) {
            res.status(400).json({ message: 'Please Fill out a description'})
        }
        else {
        const task = await db('tasks').insert(taskData);
        res.status(201).json(task);}
        }
    catch (err) {
        res.status(500).json({ message: 'There was an error creating the task.', error: err});
    }
});

module.exports = router;
