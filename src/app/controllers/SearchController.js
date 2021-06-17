const User = require('../models/UserModel')
const Product = require('../models/ProductModel')
const { multipleMongooseToObject, getQuantity, checkLoginForOption } = require('../../util/mongoose.js')
const bcrypt = require('bcrypt')


class SearchController {

    async index(req, res, next) {
        var quantity = getQuantity(req.cookies.cart)
        var lst = checkLoginForOption(req.session)

        const { query } = req.params
        var product = await Product.find({ "name": { $regex: ".*" + query + ".*" } })
        product = multipleMongooseToObject(product)

        res.render('search', {
            layout: 'main.hbs',
            quantity: quantity,
            product: product,
            css: "product.css",
            js: "search.js",
            loginAccount: lst[0],
            registerLogout: lst[1]
        })
    }

    async search(req, res, next) {
        const { query } = req.params
        var product = await Product.find({ "name": { $regex: ".*" + query + ".*" } })
        product = multipleMongooseToObject(product)
        if (product)
            // console.log(product)
            // res.render('search', {
            //     layout: 'main.hbs',
            //     quantity: quantity,
            //     product: product,
            //     css: "product.css",
            //     js: "search.js",
            //     loginAccount: lst[0],
            //     registerLogout: lst[1]
            // })
            res.send({ product: product })
    }

}


module.exports = new SearchController();
