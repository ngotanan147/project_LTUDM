const Product = require('../models/ProductModel')
const { multipleMongooseToObject, getQuantity,checkLoginForOption } = require('../../util/mongoose.js')


class HomesController {
    async index(req, res, next) {
        const product = await Product.find({ categoryId: 1 })
        var lst = checkLoginForOption(req.session)
        var quantity = getQuantity(req.cookies.cart)

        res.render('home', {
            layout: 'main.hbs',
            product: multipleMongooseToObject(product),
            quantity: quantity,
            css: "trangchu.css",
            js: "home.js",
            loginAccount: lst[0],
            registerLogout: lst[1]
        })
    }

    notFound(req, res, next) {
        res.render('404notfound', { layout: false })
    }

}

module.exports = new HomesController();
