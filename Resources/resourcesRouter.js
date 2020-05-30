const express = require('express');


const db = require('../data/db-config.js');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const resources = await db('resources');
        res.status(200).json(resources);
    } catch (err) {
        res.status(500).json({ message: 'Could not retrieve resources', error: err});
    }
});

router.post('/', async (req, res) => {
    const resourceData = req.body;
    console.log(req.body);

    try {
        if (!resourceData.name) {
            res.status(400).json({ message: 'Please Fill out a name.'})
        }
        else {
        const resource = await db('resources').insert(resourceData);
        res.status(201).json(resource);}
        }
    catch (err) {
        res.status(500).json({ message: 'There was an error creating the resource.', error: err});
    }
});

module.exports = router;
