const express = require('express');
const logger = require('../lib/logger');
const router = require('./routes');
const { errors } = require('celebrate');

class Server {
  constructor(port) {
    this.port = parseInt(port);
    this.app = express();
  }

  middlewares() {
    this.app.use(express.json({ limit: process.env.MAX_PAYLOAD_SIZE }));
  }

  routes() {
    this.app.use(router);
    this.app.use(errors());
  }

  errorHandling() {
    this.app.use((err, req, res, next) => {
      if (err) {
        logger.error(err.stack);
        return res.status(500).send('Internal Server Error');
      }
      next();
    });
  }

  listen() {
    this.app.listen(this.port, () =>
      logger.info(`${process.env.APP_NAME} initialized on port: ${this.port}`)
    );
  }

  bootstrap() {
    this.middlewares();
    this.routes();
    this.errorHandling();
    this.listen();
  }
}

module.exports = new Server(process.env.APP_PORT);
