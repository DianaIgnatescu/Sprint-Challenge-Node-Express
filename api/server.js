const express = require('express');

const projectsRoutes = require('./routes/projects');
const actionsRoutes = require('./routes/actions');

const server = express();

server.use(express.json());
server.use('/api/projects', projectsRoutes);
server.use('/api/actions', actionsRoutes);

server.get('/', (req, res) => {
  res.json('I\'m ready to partaaaay!');
});

module.exports = server;
