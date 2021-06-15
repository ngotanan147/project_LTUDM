const mongoose = require('mongoose');


const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Bill = new Schema({
    userId: { type: mongoose.ObjectId, required: true, maxLenght: 255 },
    totalPrice: { type: Number, required: true },
}, {
    timestamps: true
});

module.exports = mongoose.model('Bill', Bill)
