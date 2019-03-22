const express = require('express');

const actionDb = require('../../data/helpers/actionModel');

const router = express.Router();

router.get('/', (req, res) => {
  actionDb.get()
      .then((actions) => {
        res.status(200).json(actions);
      })
      .catch((error) => {
        res.status(500).json({ error: 'The actions could not be retrieved.' });
      });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  actionDb.get(id)
      .then((action) => {
        if (!action) {
          res.status(404).json({ message: 'The action with the specified ID does not exist.' });
        } else {
          res.status(200).json(action)
        }
      })
      .catch((error) => {
        res.status(500).json({ error: 'The action information could not be retrieved.' });
      });
});

router.post('/', (req, res) => {
  const { project_id, description, notes } = req.body;
  if (!project_id || !description || !notes) {
    res.status(400).json({ errorMessage: 'Please provide a project ID, description, and notes for the action.' });
  } else {
    actionDb.insert({ project_id, description, notes })
        .then((data) => {
          res.status(201).json(data);
        })
        .catch((error) => {
          res.status(500).json({ error: 'There was an error while saving the action to the database.' });
        });
  }
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const action = req.body;
  const { project_id, description, notes } = req.body;
  if(!project_id || !description || !notes) {
    res.status(400).json({ errorMessage: 'Please provide a project_id, description, and notes for the action.' });
  } else {
    actionDb.update(id, action)
        .then((data) => {
          if (!data) {
            res.status(404).json({ message: 'The action with the specified ID does not exist.' });
          } else {
            res.status(200).json({ action: { id, ...action }});
          }
        })
        .catch((error) => {
          res.status(500).json({ error: 'The action information could not be modified.' });
        });
  }
});

module.exports = router;
