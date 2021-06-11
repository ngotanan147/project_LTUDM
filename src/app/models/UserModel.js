const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator')


const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const User = new Schema({
    email: { type: String, required: true, maxLenght: 255 },
    password: { type: String, required: true },
    avatar: { type: String, unique: false },
    level: { type: Number, required: true },
}, {
    timestamps: true
});

module.exports = mongoose.model('User', User)
