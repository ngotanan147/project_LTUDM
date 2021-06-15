const mongoose = require('mongoose');


const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const BillDetail = new Schema({
    productId: { type: mongoose.ObjectId, required: true, maxLenght: 255 },
    productName: { type: String, required: true},
    billId: { type: mongoose.ObjectId, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true }
})

module.exports = mongoose.model('BillDetail', BillDetail)
