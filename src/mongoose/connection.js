const mongoose = require('mongoose');
const logger = require('../lib/logger');

const connect = async () => {
  try {
    await mongoose.connect(
      `mongodb://${process.env.MONGO_HOST}/${process.env.MONGO_DATABASE}`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    logger.info('Mongoose connected');
  } catch (e) {
    logger.error(`Error connecting to MongoDB: ${e.message}`, {
      severity: 'critical',
      stacktrace: e.stack,
    });
    throw e;
  }
};

const disconnect = async () => {
  try {
    await mongoose.disconnect();
    logger.info('Mongoose disconnected');
  } catch (error) {
    logger.error(`failed to disconnect from mongo - ${error.message}`, {
      severity: 'critical',
    });
    throw error;
  }
};

mongoose.connection.once('open', () => {
  logger.info(`Mongoose default connection open to ${process.env.MONGO_HOST}`);
});

mongoose.connection.on('error', (error) => {
  logger.error(`mongodb error ${process.env.MONGO_HOST} - ${error}`, {
    severity: 'critical',
  });
});

mongoose.connection.on('disconnected', () => {
  logger.error(`mongodb disconnected ${process.env.MONGO_HOST}`, {
    severity: 'critical',
  });
});

module.exports = {
  connect,
  disconnect,
  mongoose,
};
