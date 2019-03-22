// play this: https://www.youtube.com/watch?v=d-diB65scQU

// code away!
const server = require('./api/server');

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Listening on port ${PORT}` ));
