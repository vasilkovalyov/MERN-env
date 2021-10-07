const config = require('./config');
const mongoose = require('mongoose');


module.exports = () => {
    return new Promise((resolve, reject) => {
        mongoose.connection
        .on('error', error => {
            console.log('Error connect to database');
            reject(error);
        })
        .on('close', () => console.log('Database connection closed.'))
        .once('open', () => {
            console.log(mongoose.collection)
            return resolve(mongoose.connection)
        })

        mongoose.connect(config.MONGO_URL, { useUnifiedTopology: true, useNewUrlParser: true })
    });
}