const mongoose = require('mongoose')
const config = require('../config/index')

module.exports = async () => {
    mongoose.connect(config.databaseURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    })
}