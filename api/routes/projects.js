const express = require('express');

const projectDb = require('../../data/helpers/projectModel');

const router = express.Router();



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

router.post('/', (req, res) => {
  const { name, description } = req.body;
  if (!name || !description) {
    res.status(400).json({ errorMessage: 'Please provide a name and description for the project' });
  } else {
    projectDb.insert({ name, description })
        .then((data) => {
          res.status(201).json(data);
        })
        .catch((error) => {
          res.status(500).json({ error: 'There was an error while saving the project to the database.' });
        });
  }
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const project = req.body;
  const { name, description } = req.body;
  if (!name || !description) {
    res.status(400).json({ errorMessage: 'Please provide a name and description for the project.' });
  } else {
    projectDb.update(id, project)
        .then((data) => {
          if (!data) {
            res.status(404).json({message: 'The project with the specified ID does not exist.'});
          } else {
            res.status(200).json({project: {id, ...project}});
          }
        })
        .catch((error) => {
          res.status(500).json({error: 'The project information could not be modified.'});
        });
  }
});

module.exports = router;
