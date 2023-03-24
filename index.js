require('dotenv/config');
const Server = require('./src/server/server');
const mongoose = require('./src/mongoose/connection');

const main = async () => {
  try {
    Server.bootstrap();
    await mongoose.connect();
  } catch (error) {
    console.error(error);
  }
};

main();
