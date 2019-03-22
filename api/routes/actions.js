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

module.exports = router;
