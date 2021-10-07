const express = require('express');
const cors = require('cors');
const config = require('./config');
const database = require('./database');
const errorMiddleware = require('./middlewares/error-middleware');
const cookieParser = require('cookie-parser');
const multer = require('multer');

const authRoutes = require('./routes/auth');

const app = express();
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin : process.env.CLIENT_URL,
}));


app.use(express.static(process.env.STATIC_FOLDER));
multer({ dest: process.env.PATH_UPLOADS} );

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.use('/api', authRoutes);
app.use(errorMiddleware);

database().then(response => {
    app.listen(config.PORT, () => {
        console.log(`Example app listening on port ${config.PORT}`);
    });
})
.catch(e => {
    console.log(e)
})
