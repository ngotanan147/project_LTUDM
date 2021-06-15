const Product = require('../models/ProductModel')
const Bill = require('../models/BillModel')
const BillDetail = require('../models/BillDetail')
const { mongooseToObject, getQuantity, checkLoginForOption } = require('../../util/mongoose.js')
var mongoose = require('mongoose');

class CartController {
    index(req, res, next) {
        var quantity = getQuantity(req.cookies.cart)
        var lst = checkLoginForOption(req.session)

        res.render('cart', {
            layout: 'main.hbs',
            quantity: quantity,
            css: "cart.css",
            js: "cart.js",
            loginAccount: lst[0],
            registerLogout: lst[1]
        })
    }

    async addToCart(req, res, next) {
        var productId = mongoose.Types.ObjectId(req.params.id)

        await Product.findOne({ _id: productId })
            .then(product => {
                product = mongooseToObject(product)
                const formData = {
                    _id: productId,
                    name: product.name,
                    price: product.price,
                    quantity: 1,
                    image: product.image,
                }
                //reset
                // req.cookies.cart = []
                // res.cookie('cart', req.cookies.cart)

                if (req.cookies.cart === undefined) {
                    req.cookies.cart = []
                    req.cookies.cart.push(formData)
                } else {
                    var item = req.cookies.cart.filter(obj => {
                        return obj._id == productId
                    })
                    if (item.length == 0) {
                        req.cookies.cart.push(formData)
                    } else {
                        var item = req.cookies.cart.filter(obj => {
                            return obj._id == productId
                        })
                        const index = req.cookies.cart.indexOf(item[0]);
                        req.cookies.cart[index].quantity++
                    }
                }
                var sum = 0
                for (let index = 0; index < req.cookies.cart.length; index++) {
                    sum += req.cookies.cart[index].quantity
                }
                res.cookie('cart', req.cookies.cart)
                res.send({ status: true, quantity: sum })
            })
    }

    getCart(req, res, next) {
        if (req.cookies.cart != undefined) {
            res.send({ cart: req.cookies.cart })
        } else {
            res.send({ cart: [] })
        }
    }

    updateCart(req, res, next) {
        const { id, action } = req.params
        var item = req.cookies.cart.filter(obj => {
            return obj._id == id
        })
        const index = req.cookies.cart.indexOf(item[0])
        if (action == "plus") {
            req.cookies.cart[index].quantity++
        } else {
            req.cookies.cart[index].quantity--
            if (req.cookies.cart[index].quantity < 1) {
                req.cookies.cart = req.cookies.cart.filter(obj => {
                    return obj._id != id
                })
            }
        }
        res.cookie('cart', req.cookies.cart)
        res.send({ status: true })
    }

    delete(req, res, next) {
        const { id } = req.params
        req.cookies.cart = req.cookies.cart.filter(obj => {
            return obj._id !== id
        })
        res.cookie('cart', req.cookies.cart)
        res.send({ status: true })
    }

    async pay(req, res, next) {
        if (req.session.loggedIn) {
            const id = mongoose.Types.ObjectId(req.session.userId)
            var billTotal = 0
            for (let index = 0; index < req.cookies.cart.length; index++) {
                billTotal += req.cookies.cart[index].price * req.cookies.cart[index].quantity
            }
            const formData = {
                userId: id,
                totalPrice: billTotal
            }
            const bill = new Bill(formData)
            await bill.save()
                .then(bill => {
                    for (let index = 0; index < req.cookies.cart.length; index++) {
                        const formDataBillDetail = {
                            productId: req.cookies.cart[index]._id,
                            productName: req.cookies.cart[index].name,
                            billId: bill._id,
                            image: req.cookies.cart[index].image,
                            price: req.cookies.cart[index].price,
                            quantity: req.cookies.cart[index].quantity,
                        }
                        const billDetail = new BillDetail(formDataBillDetail)
                        billDetail.save()
                    }
                })

            req.cookies.cart = []
            res.cookie('cart', req.cookies.cart)
            res.send({ status: true, logged: true })
        } else {
            req.cookies.cart = []
            res.cookie('cart', req.cookies.cart)
            res.send({ status: true, logged: false })
        }
    }

    notFound(req, res, next) {
        res.render('404notfound', { layout: false })
    }
}

module.exports = new CartController();
