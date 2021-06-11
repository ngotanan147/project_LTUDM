const mongoose = require('mongoose');


const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Product = new Schema({
    name: { type: String, required: true, maxLenght: 255 },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    description: { type: String, required: true },
    categoryId: { type: String, required: true },
    categoryName: { type: String, required: true }
}, {
    timestamps: true
});

module.exports = mongoose.model('Product', Product)
