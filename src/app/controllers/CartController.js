const Product = require('../models/ProductModel')
const Cart = require('../models/CartModel.js')
const { multipleMongooseToObject } = require('../../util/mongoose.js')


class CartController {
    async index(req, res, next) {
        const product = await Product.find({ categoryName: "Mon an noi bat" })

        res.render('home', { layout: 'main.hbs', product: multipleMongooseToObject(product) })
    }

    notFound(req, res, next) {
        res.render('404notfound', { layout: false })
    }

}

module.exports = new CartController();
