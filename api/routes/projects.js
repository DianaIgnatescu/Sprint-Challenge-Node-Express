const express = require('express');

const projectDb = require('../../data/helpers/projectModel');

const router = express.Router();

module.exports = router;

router.get('/', (req, res) => {
  projectDb.get()
      .then((projects) => {
        res.status(200).json(projects);
      })
      .catch((error) => {
        res.status(500).json({ error: 'The projects could not be retrieved.' });
      });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  projectDb.get(id)
      .then((project) => {
        if (!project) {
          res.status(404).json({ message: 'The project with the specified ID does not exist.' });
        } else {
          res.status(200).json(project);
        }
      })
      .catch((error) => {
        res.status(500).json({ error: 'The project information could not be retrieved.' });
      });
});
