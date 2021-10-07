const dotenv = require('dotenv');
const path = require('path');

const root = path.join.bind(this, __dirname);

dotenv.config( { path: root('.env') } );

module.exports = {
    PORT: process.env.PORT || 3000,
    CLIENT_URL: process.env.CLIENT_URL,
    MONGO_URL: process.env.MONGO_URL,
    DATABASE_NAME: process.env.DATABASE_NAME,
    JWT: {
        ACCESS_TOKEN: {
            TOKEN: process.env.JWT_ACCESS_SECRET,
            EXPIRES_IN: '30s'
        }, 
        REFRESH_TOKEN: {
            TOKEN: process.env.JWT_REFRESH_SECRET,
            EXPIRES_IN: '30d'
        }
    }
};
