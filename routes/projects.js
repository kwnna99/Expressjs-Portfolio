const express = require('express');
const router = express.Router();
const { data } = require('../data.json');
const { projects } = data;

/**
 * Get the id and display the corresponding project, if the id is out of the projects' range, return a 404 error.
 */
router.get('/:id', (req, res,next) => {
    const { id } = req.params;
    const projectToShow=projects[id];
    res.render('project', projectToShow);
});

module.exports = router;