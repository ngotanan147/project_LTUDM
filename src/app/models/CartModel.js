const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Cart = new Schema({
    userId: { type: mongoose.ObjectId, required: true },
    userName: { type: String, required: true },
    productName: { type: Number, required: true },
    productId: { type: mongoose.ObjectId, required: true },
    productImage: { type: String, required: true },
    productPrice: { type: String, required: true },
    quantity: { type: Number, required: true },
}, {
    timestamps: true
});

module.exports = mongoose.model('Cart', Cart)
