const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();

const jsonParser = express.json();
const MAX_SIZE_IMAGE = 5 * 1000 * 1000;

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        try {
            callback(null, process.env.PATH_UPLOADS)
        } catch(e) {
            console.log(e)
        }
    },
    filename: function (req, file, callback) {
        try {
            const ext = file.mimetype.split('/')[1]
            callback(null, `image-${Date.now()}.${ext}`)
        } catch(e) {
            console.log(e)
        }
    }
})

function checkFileType(file, callback){
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if(mimetype && extname){
        return callback(null,true);
    } else {
        callback({
            message: 'You try to upload wrong types of file, you must upload only images (jpg, jpeg, png)'
        });
    }
}

const upload = multer({ 
    storage: storage,
    limits: { fileSize: MAX_SIZE_IMAGE },
    fileFilter: function(req, file, callback) {
        checkFileType(file, callback);
    }
})

module.exports = upload