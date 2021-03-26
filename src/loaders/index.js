const {ExpressServer} = require('./server/expressServer');
const config = require('../config')

module.exports = async () => {

    const  server =  new ExpressServer();

    server.start();

    console.log('########################################');
    console.log(`Server listening on port ${config.port}`);
    console.log('########################################');
}
