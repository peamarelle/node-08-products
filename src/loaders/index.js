const logger = require('../loaders/logger/index')
const {ExpressServer} = require('./server/expressServer');
const config = require('../config')
const mongooseLoader = require('../mongoose')

module.exports = async () => {

    const  server =  new ExpressServer();
    await mongooseLoader();

    logger.info(`Database connected!`)
    
    server.start();

    logger.info(`########################################
    Server listening on port ${config.port}
    ########################################`);
}
