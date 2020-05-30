const express = require('express');


const db = require('../data/db-config.js');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const projects = await db('projects');
        res.status(200).json(projects);
    } catch (err) {
        res.status(500).json({ message: 'Could not retrieve projects', error: err});
    }
});

router.post('/', async (req, res) => {
    const projectData = req.body;
    console.log(req.body);

    try {
        if (!projectData.name) {
          res.status(400).json({ message: 'Please fill out the name field'})
        }
        else {
          const project = await db('projects').insert(projectData);
          res.status(201).json(project);
          }
        }
    catch (err) {
        res.status(500).json({ message: 'There was an error creating the project.', error: err});
    }
});

module.exports = router;
