const Product = require('../models/ProductModel')
const { mongooseToObject, getQuantity, checkLoginForOption, multipleMongooseToObject } = require('../../util/mongoose.js')
var mongoose = require('mongoose');

class ProductDetailController {
    async index(req, res, next) {
        var quantity = getQuantity(req.cookies.cart)
        var lst = checkLoginForOption(req.session)
        const { productId } = req.params

        var product = await Product.find({ _id: productId })
        product = multipleMongooseToObject(product)
        
        res.render('productdetail', {
            layout: 'main.hbs',
            quantity: quantity,
            product: product,
            css: "productdetail.css",
            js: "productdetail.js",
            loginAccount: lst[0],
            registerLogout: lst[1]
        })
    }



    notFound(req, res, next) {
        res.render('404notfound', { layout: false })
    }
}


module.exports = new ProductDetailController();
