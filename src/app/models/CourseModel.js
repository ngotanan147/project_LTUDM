const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Course = new Schema({
    name: { type: String, maxLenght: 255 },
    description: { type: String, maxLenght: 600 },
    image: { type: String },
    videoid: { type: String },
    level: { type: String },
}, {
    timestamps: true
});

module.exports = mongoose.model('Course', Course);