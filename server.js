const express = require('express');
const helmet = require('helmet');
const zooRouter = require('./zooRoutes/zooRoutes');

const server = express();

server.use(express.json());
server.use(helmet());
server.use('/api/zoos', zooRouter);

// endpoints here
server.get('/', (req, res) => {
    try {
        res.send(`<h3>Welcom to the Zoo api</h3`);
    } catch (error) {
        res.status(500).json({
            error: `There was an error reaching the home page`
        });
    }
});

module.exports = server
