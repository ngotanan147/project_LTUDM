const Product = require('../models/ProductModel')
const { mongooseToObject, getQuantity, checkLoginForOption, multipleMongooseToObject } = require('../../util/mongoose.js')
var mongoose = require('mongoose');

class ProductController {
    index(req, res, next) {
        var quantity = getQuantity(req.cookies.cart)
        var lst = checkLoginForOption(req.session)
        res.render('product', {
            layout: 'main.hbs',
            quantity: quantity,
            css: "product.css",
            js: "product.js",
            loginProduct: lst[0],
            registerLogout: lst[1]
        })
    }

    async getProductByCategory(req, res, next) {
        const { category } = req.params

        var product = await Product.find({ categoryId: category })
        product = multipleMongooseToObject(product)

        res.send({ product: product })
    }

    async getAll(req, res, next) {
        var product = await Product.find({})
        product = multipleMongooseToObject(product)

        res.send({ product: product })
    }

    notFound(req, res, next) {
        res.render('404notfound', { layout: false })
    }
}


module.exports = new ProductController();
