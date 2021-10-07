const mongoose = require('mongoose');
const Schema = mongoose.Schema
const { ObjectId } = Schema.Types

const model = new Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    initials: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    image: {
        url: {
            type: String,
            required: false
        },
        name: {
            type: String,
            required: false
        },
        mimetype: {
            type: String,
            required: false
        },
        size: {
            type: String,
            required: false
        },
        alt: {
            type: String,
            required: false
        }
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 100
    },
    date: {
        type: Date,
        default: Date.now
    },
    favorites: [
        {
            type: ObjectId,
            required: false
        }
    ]
})

module.exports = mongoose.model('User', model)